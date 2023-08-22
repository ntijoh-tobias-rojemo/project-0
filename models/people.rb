class People

    #Returnerar samtligt inehåll i databasen.
    def self.all
        db.execute('SELECT * FROM people ORDER BY id')
    end

    #Returnerar samtligt inehåll i databsen som en sträng.
    def self.all_as_string
        data = db.execute('SELECT * FROM people ORDER BY id')
        return data.map { |person| "#{person["id"]}§#{person["image"]}§#{person["name"]}§#{person["nickname"] || "NO_NICK"}" }.join("§§")
    end

    def self.class(class_id)
        db.execute('SELECT * FROM people WHERE classid = ? ORDER BY id', class_id)
    end

    def self.class_as_string(class_id)
        data = db.execute('SELECT * FROM people WHERE classid = ? ORDER BY id', class_id)
        return data.map { |person| "#{person["id"]}§#{person["image"]}§#{person["name"]}§#{person["nickname"] || "NO_NICK"}" }.join("§§")
    end

    def self.create(name, nickname, classid, image)
        db.execute('INSERT INTO people (name, nickname, classid, image) VALUES(?,?,?,?)' name, nickname, classid, image)
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