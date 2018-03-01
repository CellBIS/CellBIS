# Module - CellBIS::DBIO::Lite::Table

## For Create table - `create()` :

Equivalent SQL Script :

    CREATE TABLE name_table(
        col1 INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        col2 INT(11) NOT NULL,
        col3 VARCHAR(200) NOT NULL,
    ) ENGINE=InnoDB, CHARSET=utf8

Function :

    use CellBIS::DBIO::Lite::Table;
    
    my $create_table = CellBIS::DBIO::Lite::Table->create(
        'name_table',
        [
            'col1',
            'col2',
        ],
        {
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
        },
        {
            fk => {
                name => 'name_fk',
                table_target => 'table_target',
                col_target => 'col2'
                attr => {
                    onupdate => 'cascade',
                    ondelete => 'cascade'
                }
            },
            charset => 'utf8',
            engine => 'innodb',
        }
    );

## For Create table event - `create_event()` :

    use CellBIS::DBIO::Lite::Table;
    
    my $create_event = CellBIS::DBIO::Lite::Table->create_event(
        'name_event',
        {
            start => '0', # Current Time stamp.
            end => '+1h', # future time.
        },
        '<action event scheduler - query sql>'
    );

## For Create table trigger - `create_trigger()` :

    use CellBIS::DBIO::Lite::Table;
    
    my $create_trigger = CellBIS::DBIO::Lite::Table->create_trigger(
        'name_trigger',
        'name_table',
        {
            type => before, # before || after
            action => insert, # insert, update, delete
        },
        '<query sql>'
    );