import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Укажите корректный email"),
  password: z.string().min(1, "Введите пароль"),
});

export const signUpSchema = z
  .object({
    email: z.email("Укажите корректный email"),
    password: z.string().min(8, "Пароль не менее 8 символов"),
    confirmPassword: z.string().min(1, "Подтвердите пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
