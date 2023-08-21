class Users

    #Returnerar samtligt inehåll i databasen.
    def self.all
        db.execute('SELECT * FROM users ORDER BY id')
    end

    private
    #Returnerar en databas om den finns, annars skapas en.
    def self.db
        return @db if @db
        @db = SQLite3::Database.new('db/db.sqlite')
        @db.results_as_hash = true
        @db
    end
end