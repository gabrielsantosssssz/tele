import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  // Mock database for the neighborhood accumulation
  // CEP 01010-000 -> Padaria: 85.00, Quitanda: 120.00
  const accumulatedData: Record<string, Record<string, number>> = {
    '01010-000': {
      '1': 85.00,
      '2': 120.00
    }
  };

  const stores = [
    { id: 1, nome: "Padaria Pão Cheiroso", meta: 150.00 },
    { id: 2, nome: "Quitanda Fresca", meta: 200.00 }
  ];

  // API endpoint for shipping calculation
  app.post('/api/calcular-frete', (req, res) => {
    const { loja_id, cep, valor_carrinho } = req.body;

    const store = stores.find(s => s.id === Number(loja_id));
    if (!store) {
      return res.status(404).json({ error: 'Loja não encontrada' });
    }

    let valor_acumulado = 0;
    if (accumulatedData[cep] && accumulatedData[cep][String(loja_id)]) {
      valor_acumulado = accumulatedData[cep][String(loja_id)];
    } else {
      // Simulate random accumulated between 40 and 120 as per rule
      valor_acumulado = Math.floor(Math.random() * (120 - 40 + 1) + 40);
    }

    const valor_total = valor_acumulado + valor_carrinho;
    const meta = store.meta;
    
    // Calculations as per requirements
    const porcentagem_meta = Math.min((valor_total / meta) * 100, 100);
    const progresso_visual = porcentagem_meta / 100;
    const valor_restante = Math.max(meta - valor_total, 0);
    
    const status = valor_total < meta ? "EM_PROGRESSO" : "FRETE_GRATIS_LIBERADO";
    const mensagem_interface = status === "EM_PROGRESSO" 
      ? `Faltam apenas R$ ${valor_restante.toFixed(2)} para liberar o frete grátis coletivo no seu CEP!`
      : "🎉 Frete grátis liberado para o seu CEP!";

    const response = {
      loja: { id: store.id, nome: store.nome },
      cep: cep,
      meta_frete_gratis: Number(meta.toFixed(2)),
      valor_acumulado_anterior: Number(valor_acumulado.toFixed(2)),
      valor_carrinho: Number(valor_carrinho.toFixed(2)),
      valor_total_comunitario: Number(valor_total.toFixed(2)),
      porcentagem_meta: Number(porcentagem_meta.toFixed(2)),
      progresso_visual: Number(progresso_visual.toFixed(2)),
      valor_restante_meta: Number(valor_restante.toFixed(2)),
      status: status,
      mensagem_interface: mensagem_interface
    };

    res.json(response);
  });

  // Mock endpoint to get all stores with their current neighborhood progress
  app.get('/api/lojas', (req, res) => {
    const { cep } = req.query;
    const cepStr = String(cep || '01010-000');
    
    const results = stores.map(store => {
      let valor_acumulado = 0;
      if (accumulatedData[cepStr] && accumulatedData[cepStr][String(store.id)]) {
        valor_acumulado = accumulatedData[cepStr][String(store.id)];
      } else {
        valor_acumulado = Math.floor(Math.random() * (120 - 40 + 1) + 40);
      }
      
      const porcentagem = Math.min((valor_acumulado / store.meta) * 100, 100);
      
      return {
        ...store,
        valor_acumulado,
        porcentagem,
        valor_restante: Math.max(store.meta - valor_acumulado, 0)
      };
    });
    
    res.json(results);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://localhost:3000');
  });
}

startServer();
