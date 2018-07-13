CREATE TABLE IF NOT EXISTS users(
user_id         INT UNSIGNED AUTO_INCREMENT,
first_name		VARCHAR(50),
last_name		VARCHAR(50),
email		    VARCHAR(50) UNIQUE NOT NULL,
organization	VARCHAR(50),
PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS rds(
rds_id          INT UNSIGNED AUTO_INCREMENT,
admin_id	    INT UNSIGNED NOT NULL,
raw_doc         VARCHAR(255) UNIQUE NOT NULL,
signed_doc	    VARCHAR(255) UNIQUE,
admin_url       VARCHAR(255) UNIQUE NOT NULL,
creation		TIMESTAMP	NOT NULL,
modification	TIMESTAMP	NOT NULL,
closure		    TIMESTAMP,
validation		TIMESTAMP,
meeting_dt	    DATETIME,
meeting_loc	    VARCHAR(50),
meeting_subj	VARCHAR(100),
PRIMARY KEY (rds_id),
INDEX (admin_id),
FOREIGN KEY (admin_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS user_rds(
rds_id	    INT UNSIGNED NOT NULL,
user_id	    INT UNSIGNED NOT NULL,
user_url	VARCHAR(255)	UNIQUE,
user_tag	CHAR(7)		NOT NULL,
sign_dt	    DATETIME,
raw_img	    VARCHAR(255)	UNIQUE,
final_img	VARCHAR(255)	UNIQUE,
PRIMARY KEY (rds_id, user_id),
FOREIGN KEY (rds_id)
    REFERENCES rds(rds_id)
    ON DELETE CASCADE,
FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS alert(
alert_id        INT UNSIGNED AUTO_INCREMENT,
rds_id		    INT UNSIGNED NOT NULL,
user_id		    INT UNSIGNED NOT NULL,
email_subject	VARCHAR(255),
email_content	TEXT,
send_date		DATETIME NOT NULL,
PRIMARY KEY (alert_id),
INDEX (rds_id, user_id),
FOREIGN KEY (rds_id)
    REFERENCES rds(rds_id)
    ON DELETE CASCADE,
FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
