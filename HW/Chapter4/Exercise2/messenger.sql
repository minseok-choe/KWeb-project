CREATE TABLE `users`
(
    `id`               INT          NOT NULL AUTO_INCREMENT,
    `user_id`          VARCHAR(20)  NOT NULL,
    `user_pw`          VARCHAR(100) NOT NULL,
    `user_name`        VARCHAR(20)  NOT NULL,
    `profile_pic`      VARCHAR(100) NOT NULL,
    `profile_msg`      VARCHAR(100) NOT NULL,
    `is_canceled`      TINYINT(1) DEFAULT 0,
    `date_of_creation` TIMESTAMP    NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
CREATE TABLE `channels`
(
    `id`               INT          NOT NULL AUTO_INCREMENT,
    `channel_name`     VARCHAR(20)  NOT NULL,
    `creator`          INT          NOT NULL,
    `link`             VARCHAR(100) NOT NULL,
    `max_size`         INT          NOT NULL,
    `is_canceled`      TINYINT(1) DEFAULT 0,
    `date_of_creation` TIMESTAMP    NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`creator`) REFERENCES `users` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
CREATE TABLE `chats`
(
    `id`               INT          NOT NULL AUTO_INCREMENT,
    `content`          VARCHAR(300) NOT NULL,
    `creator`          INT          NOT NULL,
    `channel`          INT          NOT NULL,
    `date_of_creation` TIMESTAMP    NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`creator`) REFERENCES `users` (`id`),
    FOREIGN KEY (`channel`) REFERENCES `channels` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
CREATE TABLE `follows`
(
    `id`               INT       NOT NULL AUTO_INCREMENT,
    `follower`         INT       NOT NULL,
    `followee`         INT       NOT NULL,
    `date_of_creation` TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`follower`) REFERENCES `users` (`id`),
    FOREIGN KEY (`followee`) REFERENCES `users` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
CREATE TABLE `blocks`
(
    `id`               INT       NOT NULL AUTO_INCREMENT,
    `blocker`          INT       NOT NULL,
    `blocked`          INT       NOT NULL,
    `date_of_creation` TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`blocker`) REFERENCES `users` (`id`),
    FOREIGN KEY (`blocked`) REFERENCES `users` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;