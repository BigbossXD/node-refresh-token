CREATE DATABASE `test_resource`;

CREATE TABLE `testdata` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `body` varchar(255) DEFAULT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`id`)
);

INSERT INTO
    test_resource.testdata (title, body)
VALUES
    ('Title 1', 'Body1');

INSERT INTO
    test_resource.testdata (title, body)
VALUES
    ('Title 2', 'Body2');