class People

    def self.all
        db.execute('SELECT * FROM people')
    end

    private
    def self.db
        return @db if @db
        @db = SQLite3::Database.new('db/db.sqlite')
        @db.results_as_hash = true
        @db
    end
end