/**
 * @vdb {DBName} {
 *   {tableName} : 
 *     {
 *       {columnName} : {columnValue},
 *       ...
 *     }
 * 　backup?
 * }
 * 
 * @method $ = new WebVDB({DBName}) // init
 * @method 
 * 
 */

/* Modules */



/* END */

class WebVDB {  
    constructor(DBname) {
        this.DBname = "_vdb_" + DBname;

        if (this.$isset()) {
            this.$create(); // 空のデータベース作成
            this.$log("Created");
        } // もしデータベースが存在しない(初回呼び出し)なら

    }

    $create() {
        localStorage.setItem(this.DBname, "");
    }

    $get() {
        return localStorage.getItem(this.$parse(this.DBname));
    }

    $set(data) {
        localStorage.setItem(this.DBname, this.$deparse(data));
    }

    $isset() {
        return localStorage.getItem(this.DBname) == null;
    }

    $parse(data) {
        return JSON.parse(data);
    }

    $deparse(data) {
        return JSON.stringify(data);
    }

    $log(data) {
        console.log(data);
    }

    $error(data) {
        console.error("\n", data, "\n");
    }

    setTable(tableName) {
        let content = this.$get()
        if (!content[tableName]) {
            content[tableName] = {};
        }
        this.$set(content);
    }

    setCol(tableName, columnName) {
        let content = this.$get()
        if (!content[tableName]) {
            this.$error("WebVisualDB : Table doesn't exist." + tableName);
        }

        if (!content[tableName][columnName]) {
            content[tableName][columnName] = 0; // 初期値
        }
        this.$set(content);
    }

    set(tableName, columnName, value) {
        let content = this.$get()
        if (!content[tableName]) {
            this.$error("WebVisualDB : Table doesn't exist." + tableName);
        }

        if (!content[tableName][columnName]) {
            this.$error("WebVisualDB : Column doesn't exist. " + columnName);
        }

        content[tableName][columnName] = value;

        this.$set(content);
    }

    getCol(tableName, columnName) {
        let content = this.$get()

        if (!content[tableName]) {
            this.$error("WebVisualDB : Table doesn't exist." + tableName);
        }

        if (!content[tableName][columnName]) {
            this.$error("WebVisualDB : Column doesn't exist. " + columnName);
        }

        return content[tableName][columnName];
    }

    getTable(tableName) {
        let content = this.$get()

        if (!content[tableName]) {
            this.$error("WebVisualDB : Table doesn't exist." + tableName);
        }

        return content[tableName];
    }

    deleteCol(tableName, columnName) {
        let content = this.$get()
        if (!content[tableName]) {
            this.$error("WebVisualDB : Table doesn't exist." + tableName);
        }

        if (!content[tableName][columnName]) {
            this.$error("WebVisualDB : Column doesn't exist. " + columnName);
        }

        delete content[tableName][columnName];
    }

    deleteTable(tableName) {
        let content = this.$get()

        if (!content[tableName]) {
            this.$error("WebVisualDB : Table doesn't exist." + tableName);
        }

        delete content[tableName];
    }

    admin = {
        drop: function() {
            localStorage.removeItem(this.DBname);
        }
    }
};

export default WebVDB;