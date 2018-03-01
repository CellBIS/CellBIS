# Module - CellBIS::DBIO::Lite::Table

## For Create table - `create()` :

### Example 4 Arg :

Equivalent SQL Script :

    CREATE TABLE name_table(
        col1 INT(11) PRIMARY_KEY NOT NULL AUTO_INCREMENT,
        col2 INT(11) NOT NULL,
        col3 VARCHAR(200) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8

TO DO :

    use CellBIS::DBIO::Lite::Table;
    
    my $table_name = 'name_table';
    my $col_list = [
        'col1',
        'col2',
    ];
    my $col_attr = {
        'col1' => {
            type => {
                name => 'int',
                size => '11'
            },
            is_primarykey => 1,
            is_autoincre => 1,
        },
        'col2' => {
            type => {
                name => 'int',
                size => '11',
            },
            is_null => 0,
        },
        'col3' => {
            type => {
                name => 'varchar',
                size => '200',
            },
            is_null => 0,
        }
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $table = $dbio->table();
    my $create_table = $table->create($table_name, $col_list, $col_attr);

### Example 5 Arg :

Equivalent SQL Script :

    CREATE TABLE name_table(
        col1 INT(11) PRIMARY_KEY NOT NULL AUTO_INCREMENT,
        col2 INT(11) NOT NULL,
        col3 VARCHAR(200) NOT NULL,
        KEY name_fk (col2), 
        CONSTRAINT name_fk FOREIGN KEY (col2) REFERENCES table_target (col_target) 
        ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8

TO DO :

    use CellBIS::DBIO::Lite::Table;
    
    my $table_name = 'name_table';
    my $col_list = [
        'col1',
        'col2',
    ];
    my $col_attr = {
        'col1' => {
            type => {
                name => 'int',
                size => '11'
            },
            is_primarykey => 1,
            is_autoincre => 1,
        },
        'col2' => {
            type => {
                name => 'int',
                size => '11',
            },
            is_null => 0,
        }
        'col3' => {
            type => {
                name => 'varchar',
                size => '200',
            },
            is_null => 0,
        }
    };
    my $table_attr = {
        fk => {
            name => 'name_fk',
            col_name => 'col2',
            table_target => 'table_target',
            col_target => 'col_target',
            attr => {
                onupdate => 'cascade',
                ondelete => 'cascade'
            }
        },
        charset => 'utf8',
        engine => 'innodb',
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $table = $dbio->table();
    my $create_table = $table->create($table_name, $col_list, $col_attr, $table_attr);

### Example 6 Arg :

Equivalent SQL Script :

    CREATE TABLE name_table(
        col1 INT(11) PRIMARY_KEY NOT NULL AUTO_INCREMENT,
        col2 INT(11) NOT NULL,
        col3 VARCHAR(200) NOT NULL,
        KEY name_fk (col2), 
        CONSTRAINT name_fk FOREIGN KEY (col2) REFERENCES table_target (col_target) 
        ON DELETE CASCADE ON UPDATE CASCADE

    ) ENGINE=InnoDB DEFAULT CHARSET=utf8

TO DO :

    use CellBIS::DBIO::Lite::Table;
    
    my $table_name = 'name_table';
    my $col_list = [
        'col1',
        'col2',
    ];
    my $col_attr = {
        'col1' => {
            type => {
                name => 'int',
                size => '11'
            },
            is_primarykey => 1,
            is_autoincre => 1,
        },
        'col2' => {
            type => {
                name => 'int',
                size => '11',
            },
            is_null => 0,
        }
        'col3' => {
            type => {
                name => 'varchar',
                size => '200',
            },
            is_null => 0,
        }
    };
    my $table_attr = {
        fk => {
            name => 'name_fk',
            col_name => 'col2',
            table_target => 'table_target',
            col_target => 'col_target',
            attr => {
                onupdate => 'cascade',
                ondelete => 'cascade'
            }
        },
        charset => 'utf8',
        engine => 'innodb',
    };
    my $callback = sub {
        my ($dbh, $query) = @_;
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $table = $dbio->table();
    my $create_table = $table->create($table_name, $col_list, $col_attr, $table_attr, $callback);

## For Create table event - `create_event()` :

### For one time action :

Equivalent SQL Script :

    DELIMITER $$
    DROP EVENT IF EXISTS name_event $$
    CREATE EVENT name_event
        ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 MINUTE
        ON COMPLETION PRESERVE
    DO
      INSERT INTO test_table(data) VALUES('data3');
    DELIMITER ;

TO DO : 

    use CellBIS::DBIO::Lite::Table;
    
    my $event_name = 'name_event';
    my $event_attr = {
        type => 'one', # one => just one time action
        time => '1',"> 0" || [== 1 || > 1]m => in future second/minutes/hours.
    };
    my $sql_query = '<action event scheduler - query sql>';
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $table = $dbio->table();
    my $create_event = $table->create_event($event_name, $event_attr, $sql_query);

### For Continue time action :

Equivalent SQL Script :

    DELIMITER $$
    DROP EVENT IF EXISTS name_event $$
    CREATE EVENT name_event
        ON SCHEDULE EVERY 10 MINUTE
        STARTS CURRENT_TIMESTAMP
        ENDS CURRENT_TIMESTAMP + INTERVAL 1 HOUR
    DO
      INSERT INTO test_table(data) VALUES('data3');
    DELIMITER ;

TO DO : 

    use CellBIS::DBIO::Lite::Table;
    
    my $event_name = 'name_event';
    my $event_attr = {
        type => 'recurr', # recurr => is continue action base on time set.
        time => '10m', # Scheduler Every 10 Minute
        start => '0', # Current Time stamp.
        end => '+1h', # future time.
    };
    my $sql_query = '<action event scheduler - query sql>';
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $table = $dbio->table();
    my $create_event = $table->create_event($event_name, $event_attr, $sql_query);

## For Create table trigger - `create_trigger()` :

Equivalent SQL Script :

    DELIMITER $$
    DROP TRIGGER IF EXISTS trigger_test_01 $$
    CREATE TRIGGER trigger_test_01
    BEFORE INSERT
      ON test_table FOR EACH ROW
    BEGIN
        INSERT INTO test_table1(data) VALUES('dari trigger');
    END $$
    DELIMITER ;

### Without Callback : 

    use CellBIS::DBIO::Lite::Table;
    
    my $dbh = DBI->connect();
    my $table_name = 'name_table';
    my $trigger_name = 'name_trigger';
    my $trigger_attr = {
        type => before, # before || after
        action => insert, # insert, update, delete
    };
    my $sql_query = "INSERT INTO test_table1(data) VALUES('dari trigger');";
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $table = $dbio->table();
    my $create_trigger = $table->create_trigger($table_name, $table_name, $trigger_name, $trigger_attr, $sql_query);

### With Callback : 

    use CellBIS::DBIO::Lite::Table;
    
    my $dbh = DBI->connect();
    my $table_name = 'name_table';
    my $trigger_name = 'name_trigger';
    my $trigger_attr = {
        type => before, # before || after
        action => insert, # insert, update, delete
    };
    my $sql_query = "INSERT INTO test_table1(data) VALUES('dari trigger');";
    my $callback = sub {
        my ($_dbh, $q, $_param, $sql_error) = @_;
        my %data = ();
        $_dbh->do("DROP TRIGGER IF EXISTS $_param->[2]");
        if ($_dbh->do($query)) {
            $data{'result'} = 1;
            $data{'data'} = {
                'table_name' => $table_name,
                'trigger_name' => $trigger_name,
            };
        } else {
            $data{'result'} = 0;
            $data{'data'} = $sql_error;
        }
        return \%data;
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $table = $dbio->table();
    my $create_trigger = $table->create_trigger($table_name, $trigger_name, $trigger_attr, $sql_query);