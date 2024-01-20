'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { GitHubLogoIcon, Cross1Icon } from '@radix-ui/react-icons';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('メールアドレスを正しく入力してください'),
  password: z.string().min(1, 'パスワードを入力してください'),
});

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleCredentialsLogin(values: z.infer<typeof formSchema>) {
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: '/dashboard',
    });

    if (result?.error) {
      toast('Eメールまたはパスワードが違います', {
        position: 'bottom-center',
        icon: (
          <Cross1Icon className="text-white bg-red-500 rounded-full p-1 w-5 h-5" />
        ),
      });

      form.reset();
      return;
    }

    router.refresh();
    router.push('/dashboard');
  }

  async function handleGitHubLogin() {
    await signIn('github', { callbackUrl: '/dashboard' });
  }

  return (
    <Card className="container mx-auto max-w-md px-0 py-10 bg-white border-none shadow-none md:border md:shadow md:rounded-md dark:bg-gray-800 sm:px-6 md:px-8">
      <CardHeader className="p-2">
        <h1 className="text-xl md:text-3xl font-bold text-center">ログイン</h1>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCredentialsLogin)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eメール</FormLabel>
                  <FormControl>
                    <Input autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">ログイン</Button>
          </form>
        </Form>
        <Separator className="my-6" />
        <div className="space-y-4">
          <Button
            className="w-full"
            variant="outline"
            onClick={handleGitHubLogin}
          >
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            GitHubでログイン
          </Button>
        </div>
        <Link
          className="block w-full text-center text-sm underline"
          href="/register"
        >
          {'アカウントを作成する'}
        </Link>
      </CardContent>
    </Card>
  );
}
