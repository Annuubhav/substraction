Request Params :-
1. questions=2
2. digits_in_minuend=4
3. digits_in_subtrahend=4
4. has_borrowing=0

Final URL could be like :-
- http://localhost:3000/questions?questions=2&digits_in_minuend=4&digits_in_subtrahend=4&has_borrowing=0

Creating Various Options :-
1. I created a options based on the correct answer.
2. I fetched options within a range based on the correct answer. Like i took some minimum value and maximum value as per the correct answer and then generated an abitrary number between that range.

SQL Schema :-

Questions table schema
CREATE TABLE `questions` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `minuend` int(1) unsigned NOT NULL,
    `subtrahend` int(11) unsigned NOT NULL
);

CREATE TABLE `question_options` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `question_id` int(11) unsigned NOT NULL,
    `option` int(11) unsigned NOT NULL,
    `is_correct` int(1) DEFAULT 0
);