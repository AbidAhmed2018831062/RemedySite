import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    age: yup.number().required(),
  })
  .required();

const App1 = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((d) => {console.log("Hey")})}>
      <input {...register('name')} />
      <input type="number" {...register('age')} />
      <input type="submit" />
    </form>
  );
};
export default App1;