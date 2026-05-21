insert into public.transactions (amount, type, category, description, date) values
  (85000, 'income', 'Зарплата', 'Оклад за месяц', current_date),
  (15000, 'income', 'Фриланс', 'Проект', current_date - 3),
  (3200, 'expense', 'Еда', 'Продукты', current_date - 1),
  (890, 'expense', 'Транспорт', 'Метро', current_date - 2),
  (2500, 'expense', 'Развлечения', 'Кино', current_date - 5);
