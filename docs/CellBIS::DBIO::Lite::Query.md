# Module - CellBIS::DBIO::Lite

# For Function `insert()`

## `insert()` - Example $attr->{callback} == 'query' :

Equivalent on SQL Query :

    INSERT INTO name_table(col1, col2, col3) VALUES(val1, val2, val3);

Function :

    use CellBIS::DBIO::Lite;
    
    my $table_name = 'name_table';
    my $column = ['col1', 'col2', 'col3'];
    my $col_val = ['val1', 'val2', 'val3'];
    my $attr = {
        callback => 'query',
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $db_query = $dbio->query();
    my $insert = $db_query->insert($table_name, $column, $col_val, $attr);
    my $result = $insert->{result};
    my $query = $insert->{data};
    
    # OUTPUT :
    "INSERT INTO name_table(col1, col2, col3) VALUES(val1, val2, val3)"

## `insert()` - Example $attr->{callback} == 'sth' :

Equivalent on SQL Query :

    INSERT INTO name_table(col1, col2, col3) VALUES(val1, val2, val3);

Function :

    use CellBIS::DBIO::Lite;
    
    my $table_name = 'name_table';
    my $column = ['col1', 'col2', 'col3'];
    my $col_val = ['val1', 'val2', 'val3'];
    my $attr = {
        callback => 'sth',
    };
    my $callback = sub {
        my ($dbh, $sth, $q, $param, $sql_error) = @_;
        my %data = ();
        my $rv = $sth->rows;
        if ($rv >= 1) {
            my $new_id = $dbh->{mysql_insertid};
            $data{'result'} = 1;
            $data{'id'} = $new_id;
        } else {
           $data{'result'} = 0;
        }
        return \%data;
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $db_query = $dbio->query();
    my $insert = $db_query->insert($table_name, $column, $col_val, $attr, $callback);
    my $result = $insert->{result};
    my $id = $insert->{id};

## `insert()` - Example $attr->{callback} == 'data' :

Equivalent on SQL Query :

    INSERT INTO name_table(col1, col2, col3) VALUES(val1, val2, val3);

Function :

    use CellBIS::DBIO::Lite;
    
    my $table_name = 'name_table';
    my $column = ['col1', 'col2', 'col3'];
    my $col_val = ['val1', 'val2', 'val3'];
    my $attr = {
        callback => 'data',
    };
    my $callback = sub {
        my ($dbh, $sth, $id, $q, $param, $sql_error) = @_;
        my %data = ();
        $data{'result'} = 1;
        $data{'id'} = $id;
        return \%data;
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $db_query = $dbio->query();
    my $insert = $db_query->insert($table_name, $column, $col_val, $attr, $callback);
    my $result = $insert->{result}; 
    #-- other result from callback --#

# For Function `update()` :

## `update()` - Example Starndard clause :

Equivalent on SQL Query :
    
    UPDATE FROM name_table SET col1=val1, col2=val2, col3=val3 
    WHERE clause_col1 = clause_val1 AND clause_col2 = clause_val2 AND clause_col3 = clause_val3
    ORDER BY col1 ASC LIMIT 1 

Function :

    use CellBIS::DBIO::Lite;
    
    my $table_name = 'name_table';
    my $column = ['clause_col1', 'col2', 'col3'];
    my $value = ['val1', 'val2', 'val3', clause_val1, clause_val2, clause_val3];
    my $clause = {
        'where' => 'clause_col1 = ? AND clause_col2 = ? OR clause_col3 = ?',
        'orderby' => 'col1',
        'order' => 'asc', # asc || desc
        'limit' => '1'
    };
    my $callback = sub {
        my ($dbh, $sth, $sql_error) = @_;
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $db_query = $dbio->query();
    my $update = $db_query->update($table_name, $column, $value, $clause, $callback);
    
## `update()` - Example no callback :

Equivalent on SQL Query :
    
    UPDATE FROM name_table SET col1=val1, col2=val2, col3=val3 
    WHERE clause_col1 = clause_val1 AND clause_col2 = clause_val2 AND clause_col3 = clause_val3
    ORDER BY col1 ASC LIMIT 1 
    
Function :

    use CellBIS::DBIO::Lite;
    
    my $table_name = 'name_table';
    my $column = ['col1', 'col2', 'col3'];
    my $value = ['val1', 'val2', 'val3', clause_val1, clause_val2, clause_val3];
    my $clause = {
        'where' => 'clause_col1 = ? AND clause_col2 = ? OR clause_col3 = ?',
        'orderby' => 'col1',
        'order' => 'asc', # asc || desc
        'limit' => '1'
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $db_query = $dbio->query();
    my $update = $db_query->update($table_name, $column, $value, $clause);

# For Function `delete()` :

## `delete()` - Example Standard clause :

Equivalent on SQL Query :

    DELETE FROM name_table 
    WHERE clause_col1 = val1 AND table1.col2 = val2 OR table1.col3 = val3
    ORDER BY col1 LIMIT 10

Function :

    use CellBIS::DBIO::Lite;
    
    my $table_name = 'name_table';
    my $value = ['val1', 'val2', 'val3'];
    my $clause = {
        'where' => 'clause_col1 = ? AND table1.col2 = ? OR table1.col3 = ?',
        'orderby' => 'col1',
        'limit' => '10'
    };
    my $callback = sub {
        my ($dbh, $sth, $sql_error) = @_;
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $db_query = $dbio->query();
    my $delete = $db_query->delete($table_name, $value, $clause, $callback);
    
## `delete()` - Example no callback :

Equivalent on SQL Query :

    DELETE FROM name_table 
    WHERE clause_col1 = val1 AND table1.col2 = val2 OR table1.col3 = val3
    ORDER BY col1 LIMIT 10

Function :
    
    use CellBIS::DBIO::Lite;
    
    my $table_name = 'name_table';
    my $value = ['val1', 'val2', 'val3'];
    my $clause = {
        'where' => 'clause_col1 = val3 AND table1.col2 = val3 OR table1.col3 = val3',
        'orderby' => 'col1',
        'order' => 'asc', # asc || desc
        'limit' => '10'
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $db_query = $dbio->query();
    my $delete = $db_query->delete($table_name, $value, $clause);

# For Function `select()` :

## `select()` - Example for 3 Arg

Equivalent on SQL Query :

    SELECT col1, col2, col3 FROM name_table

Function :
    
    use CellBIS::DBIO::Lite;
    
    my $table_name = 'name_table';
    my $column = ['col1', 'col2', 'col3'];
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $db_query = $dbio->query();
    my $select = $db_query->select($table_name, $column);

## `select()` - Example for 4 Arg

Equivalent on SQL Query :

    SELECT col1, col2, col3 FROM name_table 
    WHERE clause_col1 = val1 AND table1.col2 = val1 OR table1.col3 = val1 
    ORDER BY col1 ASC LIMIT 10

Function :
    
    use CellBIS::DBIO::Lite;
    
    my $table_name = 'name_table';
    my $column = ['col1', 'col2', 'col3'];
    my $clause = {
        'where' => 'clause_col1 = val1 AND table1.col2 = val1 OR table1.col3 = val1',
        'orderby' => 'col1',
        'order' => 'asc', # asc || desc
        'limit' => '10'
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $db_query = $dbio->query();
    my $select = $db_query->select($table_name, $column, $clause);

## `select()` - Example for 5 Arg

Equivalent on SQL Query :

    SELECT col1, col2, col3 FROM name_table 
    WHERE clause_col1 = val1 AND table1.col2 = val1 OR table1.col3 = val1 
    ORDER BY col1 ASC LIMIT 10

Function :
    
    use CellBIS::DBIO::Lite;
    
    my $table_name = 'name_table';
    my $column = ['col1', 'col2', 'col3'];
    my $value = ['val1', 'val2', 'val3'];
    my $clause = {
        'where' => 'clause_col1 = ? AND table1.col2 = ? OR table1.col3 = ?',
        'orderby' => 'col1',
        'order' => 'asc', # asc || desc
        'limit' => '10'
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $db_query = $dbio->query();
    my $select = $db_query->select($table_name, $column, $value, $clause);

## `select()` - Example for 6 Arg

Equivalent on SQL Query :

    SELECT col1, col2, col3 FROM name_table 
    WHERE clause_col1 = val1 AND table1.col2 = val1 OR table1.col3 = val1 
    ORDER BY col1 ASC LIMIT 10

Function :
    
    use CellBIS::DBIO::Lite;
    
    my $table_name = 'name_table';
    my $column = ['col1', 'col2', 'col3'];
    my $value = ['val1', 'val2', 'val3'];
    my $clause = {
        'where' => 'clause_col1 = ? AND table1.col2 = ? OR table1.col3 = ?',
        'orderby' => 'col1',
        'order' => 'asc', # asc || desc
        'limit' => '10'
    };
    my $callback = sub {
        my ($dbh, $sth, $query, $param, $sql_error) = @_;
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $db_query = $dbio->query();
    my $select = $db_query->select($table_name, $column, $value, $clause, $callback);
    
# For Function `select_join()` :

## `select_join()` - Example for 5 Arg

Equivalent on SQL Query :

    SELECT 
    t1.col1, t1.col2, t1.col3,
    t2.col2, t2.col3, t2.col3
    FROM table1 AS t1
    LEFT JOIN table2 AS t2
    ON table1.col1 = table2.col2
    WHERE t2.col1 = 'val_t2_col1' AND t1.col2 = 'val_t1_col2' OR t1.col3 = 'val_t1_col3'
    ORDER BY col1 ASC LIMIT '10'

Function :

    use CellBIS::DBIO::Lite;
    
    my $table_name = [
        {name => 'table1', 'alias' => 't1'},
        {name => 'table2', 'alias' => 't2'}
    ];
    my $column = [
        't1.col1', 't1.col2', 't1.col3', 
        't2.col1', 't2.col2', 't2.col3', 
    ];
    my $value = ['val_t2_col1', 'val_t1_col2', 'val_t1_col3'];
    my $clause = {
        'typejoin' => {
            'table2' => 'inner',
        },
        'join' => [
            {
                name => 'table2',
                onjoin => [
                    't1.col1', 't2.col2',
                ]
            }
        ],
        'where' => 't2.col1 = ? AND t1.col2 = ? OR t1.col3 = ?',
        'orderby' => 't1.col1',
        'order' => 'desc', # asc || desc
        'limit' => '10'
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $db_query = $dbio->query();
    my $select_join = $db_query->select_join($table_name, $column, $value, $clause);

## `select_join()` - Example for 6 Arg

Equivalent on SQL Query :

    SELECT 
    t1.col1, t1.col2, t1.col3,
    t2.col2, t2.col3, t2.col3
    FROM table1 AS t1
    LEFT JOIN table2 AS t2
    ON table1.col2 = table2.col1
    WHERE t2.col1 = 'val_t2_col1' AND t1.col2 = 'val_t1_col2' OR t1.col3 = 'val_t1_col3'
    ORDER BY col1 ASC LIMIT '10'

Function :

    use CellBIS::DBIO::Lite;
    
    my $table_name = [
        {name => 'table1', 'alias' => 't1'},
        {name => 'table2', 'alias' => 't2'}
    ];
    my $column = [
        't1.col1', 't1.col2', 't1.col3', 
        't2.col1', 't2.col2', 't2.col3', 
    ];
    my $value = ['val_t2_col1', 'val_t1_col2', 'val_t1_col3'];
    my $clause = {
        'typejoin' => {
            'table2' => 'inner',
        },
        'join' => [
            {
                name => 'table2',
                onjoin => [
                    't1.col1', 't2.col2',
                ]
            }
        ],
        'where' => 't2.col1 = ? AND t1.col2 = ? OR t1.col3 = ?',
        'orderby' => 't1.col1',
        'order' => 'desc', # asc || desc
        'limit' => '10'
    };
    my $callback = sub {
        my ($dbh, $sth, $q, $param, $sql_error) = @_;
        my %data = ();
        my $rv = $sth->rows;
        if ($rv >= 1) {
            my @arr = ();
            while (my $r_data = $sth->fetchrow_hashref()) {
                push @arr, $r_data;
            }
            $data{'result'} = 1;
            $data{'data'} = \@arr;
        } else {
            $data{'result'} = 0;
            $data{'data'} = $sql_error->errdata($sth);
        }
        return \%data;
    };
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $db_query = $dbio->query();
    my $select_join = $db_query->select_join($table_name, $column, $value, $clause, $callback);

# For Function `last_data_table()` :

Equivalent on SQL Query :

    SELECT * FROM table1 ORDER BY col1 DESC LIMIT 1;

Function :

    use CellBIS::DBIO::Lite;
    
    my $table_name = 'name_table';
    my $column = ['col1', 'col2', 'col3'];
    my $orderby = 'col1';
    my $limit = '10';
    
    my $dbio = CellBIS::DBIO::Lite->new($db_config);
    my $db_query = $dbio->query();
    my $last_data = $db_query->last_data($table_name, $column, $orderby, $limit);
    