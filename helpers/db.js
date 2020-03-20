import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('favorites.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        //'DROP TABLE IF EXISTS favorites;',
        'CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY NOT NULL, countryId INTEGER NOT NULL UNIQUE);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchFavs = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM favorites',
            [],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
      return promise;
};

export const insertFav = (countryId) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO favorites (countryId) VALUES (?);`,
                [countryId],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise
}

export const deleteFav = (countryId) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM favorites WHERE countryId = ?;`,
                [countryId],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise
}