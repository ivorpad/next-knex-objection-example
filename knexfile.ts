// Update with your config settings.

module.exports = {

  development: {
    client: "sqlite3",
    connection: {
      filename: "./test.db"
    },
    useNullAsDefault: true
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: "./test.db"
    },
    useNullAsDefault: true
  },
};
