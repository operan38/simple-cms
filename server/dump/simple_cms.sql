-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 01 2020 г., 20:40
-- Версия сервера: 5.7.25
-- Версия PHP: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `simple_cms`
--

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `id` int(11) UNSIGNED NOT NULL,
  `post_id` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `parent_id` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `type` varchar(255) NOT NULL DEFAULT 'post',
  `user` varchar(60) NOT NULL,
  `message` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `parent_id`, `type`, `user`, `message`, `created`) VALUES
(2, 1, 0, 'post', 'Вася', 'Hello World', '2020-05-01 17:14:25');

-- --------------------------------------------------------

--
-- Структура таблицы `components`
--

CREATE TABLE `components` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(80) CHARACTER SET utf8 NOT NULL,
  `value` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `containers`
--

CREATE TABLE `containers` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(80) CHARACTER SET utf8 NOT NULL,
  `path` varchar(80) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `containers`
--

INSERT INTO `containers` (`id`, `title`, `path`) VALUES
(1, 'Default', './Default/Default'),
(2, 'Dynamic', './Dynamic/Dynamic');

-- --------------------------------------------------------

--
-- Структура таблицы `posts`
--

CREATE TABLE `posts` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `subtitle` varchar(100) CHARACTER SET utf8 NOT NULL,
  `text` text CHARACTER SET utf8 NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `posts`
--

INSERT INTO `posts` (`id`, `title`, `subtitle`, `text`, `created`) VALUES
(1, 'Тестовый пост 1', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-27 06:16:59'),
(2, 'Тестовый пост 2', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-27 09:42:01'),
(3, 'Тестовый пост 3', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-27 15:47:42'),
(4, 'Тестовый пост 4', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-27 15:47:42'),
(5, 'Тестовый пост 5', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 07:00:43'),
(6, 'Тестовый пост 6', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 07:00:43'),
(7, 'Тестовый пост 7', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 07:01:57'),
(8, 'Тестовый пост 8', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 07:01:57'),
(9, 'Тестовый пост 9', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 07:01:57'),
(10, 'Тестовый пост 10', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 07:01:57'),
(11, 'Тестовый пост 11', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:04:52'),
(12, 'Тестовый пост 12', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:04:52'),
(13, 'Тестовый пост 13', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:04:52'),
(14, 'Тестовый пост 14', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:04:52'),
(15, 'Тестовый пост 15', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:04:52'),
(16, 'Тестовый пост 16', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:09:01'),
(17, 'Тестовый пост 17', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:09:01'),
(18, 'Тестовый пост 18', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:09:01'),
(19, 'Тестовый пост 19', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:09:01'),
(20, 'Тестовый пост 20', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:09:01'),
(21, 'Тестовый пост 21', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:11:00'),
(22, 'Тестовый пост 22', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:11:00'),
(23, 'Тестовый пост 23', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:11:00'),
(24, 'Тестовый пост 24', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:11:00'),
(25, 'Тестовый пост 25', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', '2020-04-30 18:11:00');

-- --------------------------------------------------------

--
-- Структура таблицы `routes`
--

CREATE TABLE `routes` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT 'Заголовок',
  `path` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT 'Путь',
  `container_id` int(11) UNSIGNED NOT NULL COMMENT 'id контейнера'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `routes`
--

INSERT INTO `routes` (`id`, `title`, `path`, `container_id`) VALUES
(29, 'Тест', '/123', 1),
(30, 'Тестовый маршрут', '/test', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `surname` varchar(60) CHARACTER SET utf8 DEFAULT NULL,
  `firstname` varchar(60) CHARACTER SET utf8 DEFAULT NULL,
  `patronymic` varchar(60) CHARACTER SET utf8 DEFAULT NULL,
  `login` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 NOT NULL,
  `mail` varchar(80) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `surname`, `firstname`, `patronymic`, `login`, `password`, `mail`) VALUES
(1, NULL, NULL, NULL, 'test', '$2a$04$R/Ew51bt4yuXrM7sHkYMFe5L1V3fdhrF0oxY.JltD.x1ugmvrtFJq', NULL),
(2, NULL, NULL, NULL, 'test2', '$2a$04$G3nk2H8yQel4j.PTW851.ukTPjx1uZ9G0djUnMeC1xb.dndh9Pe5e', NULL),
(3, NULL, NULL, NULL, 'test4', '$2a$04$shjDmoBgHJVpKyqLOkLk9eeEfYXoI/MYb1MaoZ2CImf0.k4GfHCjy', NULL),
(4, NULL, NULL, NULL, 'test5', '$2a$04$0jFOpBFqVtNh/V6eMgD9qOqIV5AXy1DXG/XVT1cRr6Nf8h.hBDJRi', NULL),
(5, '123', '123', '123', '123', '$2a$04$vfQVphdxueeF.9dUoptW6u9ZYrLst.Rd7BoNRUcQu6MNElR3P.IRm', NULL),
(6, 'qwer', 'qwert', 'qwerty', 'test6', '$2a$04$TepqX.Tg35ywQdlUR.QAd.ex3.RZPRcBCKeV3MKeULfer1r8f7uva', NULL),
(7, '123', '123', '123', 'test7', '$2a$04$zP4QLb15OI8TBZUZbVngQ.0qu/Cl7Q8oXQxNYJ4BsTxsLhijnGsNa', NULL),
(8, 'Fe', 'EFE', 'EFDE', 'test9', '$2a$04$fYzayEEfdgU69GHwgDkjJ.u8cbZmnqHzlNw2fqv5z5tX6E2dV24DG', NULL),
(9, '123ё', '123', '123', 'test10', '$2a$04$9.9eqBJpfyHBZPTCRCGBBuWsMwIXZB2ploBtHihEFcPKmqrQEY3xW', NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `components`
--
ALTER TABLE `components`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `containers`
--
ALTER TABLE `containers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `container_id` (`container_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `components`
--
ALTER TABLE `components`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `containers`
--
ALTER TABLE `containers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
