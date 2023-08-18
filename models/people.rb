class People

    #Returnerar samtligt inehåll i databasen.
    def self.all
        db.execute('SELECT * FROM people')
    end

    #Returnerar samtligt inehåll i databsen som en sträng.
    def self.all_as_string
        data = db.execute('SELECT * FROM people')
        return data.map { |person| "#{person["image"]}§#{person["name"]}§#{person["nickname"]}" }.join("§§")
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