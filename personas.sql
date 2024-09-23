-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 23, 2024 at 02:45 PM
-- Server version: 8.0.30
-- PHP Version: 8.2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `personas`
--

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `name` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `lastname` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `gender` int NOT NULL,
  `date_of_birth` date NOT NULL,
  `contact` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `department` int NOT NULL,
  `city` int NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `state` int NOT NULL DEFAULT '1',
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`name`, `lastname`, `gender`, `date_of_birth`, `contact`, `department`, `city`, `email`, `state`, `id`) VALUES
('Mariah', 'Delgadillo', 1, '2000-09-20', '(2222)222-222', 10, 35, 'mariah.stefanie.delga@gmail.com', 1, 1),
('Alvaro', 'Sosa', 2, '1997-10-17', '(3333)333-333', 1, 1, 'alvaro.sosa@gmail.com', 1, 2),
('Fiorella', 'Cardozo', 1, '2001-06-19', '0987654321', 1, 1, 'fio@gmail.com', 0, 3),
('d', 'a', 1, '1900-09-01', 'a', 8, 11, 'a', 0, 5),
('c', 'b', 2, '1998-09-23', 'b', 4, 1, 'b', 0, 6),
('Karen', 'Montiel', 1, '2001-03-05', '(1234)123-123', 5, 3, 'montiel@gmail.com', 1, 7),
('c', 'b', 2, '1998-10-27', 'b', 4, 1, 'b', 0, 8),
('d', 'a', 1, '1900-09-11', 'a', 8, 11, 'a', 0, 9),
('Richar', 'Lin', 2, '2002-01-18', '(1234)123-123', 1, 1, 'lin@gmail.com', 1, 10),
('Mara', 'Sanchez', 1, '2000-08-16', '(1234)123-123', 1, 1, 'mara@gmail.com', 1, 11),
('Karemmm', 'Montiel', 1, '2001-02-27', '0987654321', 5, 3, 'montiel@gmail.com', 0, 12),
('Eris', 'Portillo', 2, '2024-09-30', '(1234)123-123', 4, 11, 'eris@gmail.com', 1, 13),
('Natalia ', 'Sosa', 1, '2000-09-10', '(1234)123-123', 3, 8, 'nati@gmail.com', 1, 14),
('Pablo', 'Sanchez', 2, '1999-09-01', '(1234)123-123', 16, 38, 'palo@gmail.com', 1, 15),
('Jazmin', 'Romero', 1, '2001-01-03', '(1234)123-123', 14, 35, 'jazi@gmail.com', 1, 16);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
