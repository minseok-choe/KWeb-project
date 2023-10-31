#USE kwebdb1;

# |           | Column Name       | Type       |
# |-----------|-------------------|------------|
# | 이름        | name              | VC(20)     |
# | 입학연도      | year_of_admission | INT        |
# | 전공        | major             | VC(8)     |
# | 학번 중 개별번호 | student_own_id    | VC(4)      |
# | 전화번호      | phone             | VC(20)     |
# | 주소        | address           | VC(100)    |
# | 누적 이수학점   | credit_cumulative | INT        |
# | 평균 평점     | grade_mean        | DOUBLE     |
# | 재학 여부     | is_enrolled       | TINYINT(1) |

CREATE TABLE `courses`
(
    `id`                INT          NOT NULL AUTO_INCREMENT,
    `name`              VARCHAR(20)  NOT NULL,
    `year_of_admission` INT          NOT NULL,
    `major`             VARCHAR(8)   NOT NULL,
    `student_own_id`    VARCHAR(4)   NOT NULL,
    `phone`             VARCHAR(20)  NOT NULL,
    `address`           VARCHAR(100) NOT NULL,
    `credit_cumulative` INT        DEFAULT 0,
    `grade_mean`        DOUBLE     DEFAULT 0.0,
    `is_enrolled`       TINYINT(1) DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;