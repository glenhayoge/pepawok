import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/lib/auth/config';
import { Form } from 'react-hook-form';
// import { Form, Input, Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <Form action={async (formData) => {
      'use server';
      await auth.signIn('credentials', formData);
    }}>
      <Input name="email" type="email" />
      <Input name="password" type="password" />
      <Button type="submit">Login</Button>
    </Form>
  );
}