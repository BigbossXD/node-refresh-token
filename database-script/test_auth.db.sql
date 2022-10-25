CREATE DATABASE `test_auth`;

CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) DEFAULT NULL,
    `status` varchar(255) DEFAULT 'PENDING',
    `type` varchar(255) DEFAULT 'FREEMIUM',
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`id`)
);

INSERT INTO
    test_auth.users (username, password, status, `type`)
VALUES
(
        'testuser@gmail.com',
        '$2a$12$6EZcl1mrFsxIUMqVkIoY9.W0psm17i4VmGgZkjbE539Uv/CaBpcC.',
        'COMPLETED',
        'FREEMIUM'
    );