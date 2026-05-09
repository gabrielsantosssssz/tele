import React from 'react';
import { useForm } from 'react-hook-form';

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const jsonData = JSON.stringify(data);
    console.log('JSON para envio:', jsonData);
    // Simulação de envio
    alert('Candidatura enviada! Dados preparados para entrega.trabalhos01@gmail.com');
  };

  return (
    <section className="bg-[#0A0E17] text-white py-16 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#00D4FF]">Candidatura ID Labs</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Nome</label>
            <input {...register('nome', { required: true })} className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white" />
            {errors.nome && <span className="text-red-500 text-sm">Nome obrigatório</span>}
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white" />
            {errors.email && <span className="text-red-500 text-sm">Email válido obrigatório</span>}
          </div>
          <div>
            <label className="block mb-1">Telefone</label>
            <input {...register('telefone', { required: true })} className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white" />
            {errors.telefone && <span className="text-red-500 text-sm">Telefone obrigatório</span>}
          </div>
          <div>
            <label className="block mb-1">Área de Interesse</label>
            <select {...register('area', { required: true })} className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white">
              <option value="">Selecione</option>
              <option value="IA">Inteligência Artificial</option>
              <option value="SaaS">SaaS</option>
              <option value="Automação">Automação</option>
              <option value="Cibersegurança">Cibersegurança</option>
              <option value="Ciência de Dados">Ciência de Dados</option>
              <option value="Apps Mobile">Apps Mobile</option>
              <option value="IoT">IoT</option>
              <option value="Blockchain">Blockchain</option>
            </select>
            {errors.area && <span className="text-red-500 text-sm">Área obrigatória</span>}
          </div>
          <div>
            <label className="block mb-1">Mensagem</label>
            <textarea {...register('mensagem')} className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white" rows="4"></textarea>
          </div>
          <button type="submit" className="w-full bg-[#00D4FF] text-black py-2 rounded font-semibold hover:bg-[#00b8e6]">Enviar Candidatura</button>
        </form>
      </div>
    </section>
  );
};

export default Form;