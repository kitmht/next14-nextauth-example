import { NextResponse } from 'next/server';
import { users } from '@/app/db';

export async function POST(request: Request) {
  const json = await request.json();

  if (!json || !json.email || !json.password) {
    return NextResponse.json(
      {
        message: 'パラメータが不正です',
      },
      {
        status: 400,
      }
    );
  }

  if (users.find((user) => user.email === json.email)) {
    return NextResponse.json(
      { message: 'メールアドレスはすでに登録されています' },
      {
        status: 409,
      }
    );
  }

  const id = (users.length + 1).toString();
  users.push({
    id,
    name: `user${id}`,
    email: json.email,
    password: json.password,
  });

  return NextResponse.json(
    { message: 'アカウントを作成しました' },
    { status: 200 }
  );
}
