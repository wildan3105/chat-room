module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

    await db.createCollection('user', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['room_id', 'username'],
          properties: {
            room_id: {
              bsonType: 'objectId',
            },
            username: {
              bsonType: 'string',
            },
            status: {
              enum: ['Online', 'Offline'],
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
