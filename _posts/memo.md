
MySQL
=====

Create Table/Alter Table这类的SQL语句是会触发隐式commit的。
一旦执行，便自动会形成一个事务。所以不可以rollback。

尤其注意，在前一个alter table类语句未完成时，不要去执行下一个这样的语句。
当然其他数据库如Oracle/SQL Server/PostgreSQL是可以rollback的。
[可以参考这里](#http://stackoverflow.com/questions/4692690/is-it-possible-to-roll-back-create-table-and-alter-table-statements-in-major-sql)

上次的教训是：

执行drop databse，接着执行create table（没有执行完），执行了drop database，再执行create table
因为drop快，create慢，因此第二次drop没有drop掉第一次create的所有内容。
导致第二次create的时候会出现重复创建的问题。
