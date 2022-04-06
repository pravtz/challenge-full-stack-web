-- CreateTable
CREATE TABLE `student` (
    `ra` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `cpf` CHAR(14) NOT NULL,

    UNIQUE INDEX `student_email_key`(`email`),
    UNIQUE INDEX `student_cpf_key`(`cpf`),
    PRIMARY KEY (`ra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
