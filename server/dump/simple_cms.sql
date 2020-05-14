-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 14 2020 г., 11:01
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
  `post_id` int(11) UNSIGNED NOT NULL,
  `parent_id` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `type` varchar(255) NOT NULL DEFAULT 'post',
  `author` varchar(60) NOT NULL,
  `message` text NOT NULL,
  `public` tinyint(1) NOT NULL DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `parent_id`, `type`, `author`, `message`, `public`, `created`, `updated`) VALUES
(1, 1, 0, 'post', 'test', '34', 1, '2020-05-08 05:47:35', NULL),
(2, 14, 0, 'post', 'test', '12346fgfgf;\'bv', 1, '2020-05-08 13:03:50', NULL),
(3, 12, 0, 'post', 'test', '7676', 1, '2020-05-08 13:05:54', NULL),
(4, 12, 3, 'post', 'test', '4565fg', 1, '2020-05-08 13:05:57', NULL),
(5, 1, 1, 'post', 'test', '123', 1, '2020-05-11 04:42:16', NULL);

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
-- Структура таблицы `header_nav`
--

CREATE TABLE `header_nav` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(100) CHARACTER SET utf8 NOT NULL,
  `path` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `header_nav`
--

INSERT INTO `header_nav` (`id`, `title`, `path`) VALUES
(1, 'Посты', '/posts'),
(2, 'Пользователи', '/admin/users'),
(3, 'Маршруты', '/admin/routes');

-- --------------------------------------------------------

--
-- Структура таблицы `posts`
--

CREATE TABLE `posts` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `subtitle` text CHARACTER SET utf8 NOT NULL,
  `text` text CHARACTER SET utf8 NOT NULL,
  `main_photo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `public` tinyint(1) NOT NULL DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `posts`
--

INSERT INTO `posts` (`id`, `title`, `subtitle`, `text`, `main_photo`, `public`, `created`, `updated`) VALUES
(1, 'Тестовый пост 1', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-27 06:16:59', NULL),
(2, 'Тестовый пост 2', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-27 09:42:01', NULL),
(3, 'Тестовый пост 3', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-27 15:47:42', NULL),
(4, 'Тестовый пост 4', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-27 15:47:42', NULL),
(5, 'Тестовый пост 5', 'Краткое описание\r\nКраткое описание\r\nКраткое описание\r\nКраткое описание\r\nКраткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 07:00:43', NULL),
(6, 'Тестовый пост 6', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 07:00:43', NULL),
(7, 'Тестовый пост 7', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 07:01:57', NULL),
(8, 'Тестовый пост 8', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 07:01:57', NULL),
(9, 'Тестовый пост 9', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 07:01:57', NULL),
(10, 'Тестовый пост 10', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 07:01:57', NULL),
(11, 'Тестовый пост 11', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:04:52', NULL),
(12, 'Тестовый пост 12', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:04:52', NULL),
(13, 'Тестовый пост 13', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:04:52', NULL),
(14, 'Тестовый пост 14', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:04:52', NULL),
(15, 'Тестовый пост 15', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:04:52', NULL),
(16, 'Тестовый пост 16', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:09:01', NULL),
(17, 'Тестовый пост 17', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:09:01', NULL),
(18, 'Тестовый пост 18', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:09:01', NULL),
(19, 'Тестовый пост 19', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:09:01', NULL),
(20, 'Тестовый пост 20', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:09:01', NULL),
(21, 'Тестовый пост 21', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:11:00', NULL),
(22, 'Тестовый пост 22', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:11:00', NULL),
(23, 'Тестовый пост 23', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:11:00', NULL),
(24, 'Тестовый пост 24', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:11:00', NULL),
(25, 'Тестовый пост 25', 'Краткое описание', 'Подробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.\r\nПодробное описание.', NULL, 1, '2020-04-30 18:11:00', NULL);

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
(36, 'Testew43', '/qwerty', 2),
(37, 'test', '/123', 1);

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
  `mail` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `main_photo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `surname`, `firstname`, `patronymic`, `login`, `password`, `mail`, `main_photo`, `admin`) VALUES
(1, NULL, NULL, NULL, 'test', '$2a$04$R/Ew51bt4yuXrM7sHkYMFe5L1V3fdhrF0oxY.JltD.x1ugmvrtFJq', NULL, '/uploads/0c4bc668-811b-4be5-be46-44389e8dbb6a.jpg', 0),
(2, 'test2', NULL, NULL, 'test2', '$2a$04$G3nk2H8yQel4j.PTW851.ukTPjx1uZ9G0djUnMeC1xb.dndh9Pe5e', NULL, NULL, 1),
(3, NULL, NULL, NULL, 'test4', '$2a$04$shjDmoBgHJVpKyqLOkLk9eeEfYXoI/MYb1MaoZ2CImf0.k4GfHCjy', NULL, '/uploads/c68275e7-2c70-4e4c-abc9-617100e8359a-4.png', 0),
(4, NULL, NULL, NULL, 'test5', '$2a$04$0jFOpBFqVtNh/V6eMgD9qOqIV5AXy1DXG/XVT1cRr6Nf8h.hBDJRi', NULL, NULL, 0),
(5, '123', '123', '123', '123', '$2a$04$vfQVphdxueeF.9dUoptW6u9ZYrLst.Rd7BoNRUcQu6MNElR3P.IRm', NULL, NULL, 0),
(6, 'qwer', 'qwert', 'qwerty', 'test6', '$2a$04$TepqX.Tg35ywQdlUR.QAd.ex3.RZPRcBCKeV3MKeULfer1r8f7uva', NULL, NULL, 0),
(7, '123', '123', '123', 'test7', '$2a$04$zP4QLb15OI8TBZUZbVngQ.0qu/Cl7Q8oXQxNYJ4BsTxsLhijnGsNa', NULL, '/uploads/978ad0b7-1cf0-497f-97c7-a0821cf5b340-4.png', 0),
(8, 'Fe', 'EFE', 'EFDE', 'test9', '$2a$04$fYzayEEfdgU69GHwgDkjJ.u8cbZmnqHzlNw2fqv5z5tX6E2dV24DG', NULL, NULL, 0),
(9, '123ё', '123', '123', 'test10', '$2a$04$9.9eqBJpfyHBZPTCRCGBBuWsMwIXZB2ploBtHihEFcPKmqrQEY3xW', NULL, NULL, 0),
(10, '', '', '', 'test11', '$2a$04$hENSWZzRBQmROuus9ndPhOekTWLEg57c.ciG2RbC4o3qbBh3WbOVe', NULL, NULL, 0),
(11, '', '', '', 'te', '$2a$04$Mjo.zjU4yVkG/IKWl9nYpuFY4Y5j3oSYd0Qo/0W2T80I1AbJXElMG', NULL, NULL, 0),
(12, '', '', '', 'tes', '$2a$04$fGLXQbriw8fMXxJnXeNQhuL81MuXp6ogOLn45dBwE2j6pueF4e8Ty', NULL, NULL, 0),
(13, '', '', '', 't', '$2a$04$89c1.jpf.rZFvU3u98LPDOFMMlZaUZiEvDHz/lFJjTaV/igG.C8v6', NULL, NULL, 0),
(14, '', '', '', 'tgyt', '$2a$04$dKWjCy7cTSbrlFwmR.F9.uiMRNnJ14WCjnRpOuq0ziL4Iyjo7JIv.', NULL, NULL, 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`);

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
-- Индексы таблицы `header_nav`
--
ALTER TABLE `header_nav`
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
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- AUTO_INCREMENT для таблицы `header_nav`
--
ALTER TABLE `header_nav`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT для таблицы `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
