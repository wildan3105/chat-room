module.exports = {
  async up(db, client) {
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script

    await db.createCollection('room', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['code'],
          properties: {
            code: {
              bsonType: 'string',
            },
            create_date: {
              bsonType: 'date',
            },
            update_date: {
              bsonType: 'date',
            },
            is_delete: {
              bsonType: 'bool',
            },
          },
        },
      },
      collation: {
        locale: 'en_US',
        strength: 1,
      },
    });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
