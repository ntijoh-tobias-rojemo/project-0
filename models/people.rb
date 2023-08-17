class People

    def self.all
        db.execute('SELECT * FROM people')
    end

    def self.all_as_string
        data = db.execute('SELECT * FROM people')
        return data.map { |person| "#{person["image"]}§#{person["name"]}" }.join("§§")
    end

    private
    def self.db
        return @db if @db
        @db = SQLite3::Database.new('db/db.sqlite')
        @db.results_as_hash = true
        @db
    end
end