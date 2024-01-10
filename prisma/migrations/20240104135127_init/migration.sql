-- CreateTable
CREATE TABLE `user` (
    `userid` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(20) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `nickname` CHAR(8) NOT NULL,
    `image` INTEGER NOT NULL,
    `isblocked` BOOLEAN NOT NULL DEFAULT false,
    `blockreason` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `user_image_key`(`image`),
    PRIMARY KEY (`userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `postid` INTEGER NOT NULL AUTO_INCREMENT,
    `authorid` INTEGER NOT NULL,
    `article` TEXT NOT NULL,
    `title` VARCHAR(20) NOT NULL,
    `category` VARCHAR(6) NOT NULL,
    `posttime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `view` INTEGER NOT NULL,
    `like` INTEGER NOT NULL,
    `isblocked` BOOLEAN NOT NULL DEFAULT false,
    `blockreason` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`postid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reporteduser` (
    `reportid` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `reporterid` INTEGER NOT NULL,
    `reason` VARCHAR(200) NOT NULL,
    `result` VARCHAR(30) NOT NULL,
    `isresolved` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`reportid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reportedpost` (
    `reportid` INTEGER NOT NULL AUTO_INCREMENT,
    `postid` INTEGER NOT NULL,
    `reporterid` INTEGER NOT NULL,
    `reason` VARCHAR(200) NOT NULL,
    `result` VARCHAR(30) NOT NULL,
    `isresolved` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`reportid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `commentid` INTEGER NOT NULL AUTO_INCREMENT,
    `postid` INTEGER NOT NULL,
    `writerid` INTEGER NOT NULL,
    `writetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isrecomment` BOOLEAN NOT NULL,
    `recommentid` INTEGER NOT NULL,

    PRIMARY KEY (`commentid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_userlikepost` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_userlikepost_AB_unique`(`A`, `B`),
    INDEX `_userlikepost_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_authorid_fkey` FOREIGN KEY (`authorid`) REFERENCES `user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reporteduser` ADD CONSTRAINT `reporteduser_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reportedpost` ADD CONSTRAINT `reportedpost_postid_fkey` FOREIGN KEY (`postid`) REFERENCES `post`(`postid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_postid_fkey` FOREIGN KEY (`postid`) REFERENCES `post`(`postid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_writerid_fkey` FOREIGN KEY (`writerid`) REFERENCES `user`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_userlikepost` ADD CONSTRAINT `_userlikepost_A_fkey` FOREIGN KEY (`A`) REFERENCES `post`(`postid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_userlikepost` ADD CONSTRAINT `_userlikepost_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`userid`) ON DELETE CASCADE ON UPDATE CASCADE;
