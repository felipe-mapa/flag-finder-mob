import * as SQLite from 'expo-sqlite';

const scoresDB = SQLite.openDatabase('scores.db');
const favsDB = SQLite.openDatabase('favorites.db');

// FAV DATABASE
export const initFav = () => {
  const promise = new Promise((resolve, reject) => {
    favsDB.transaction(tx => {
      tx.executeSql(
        //'DROP TABLE IF EXISTS table_favorites;',
        'CREATE TABLE IF NOT EXISTS table_favorites (id INTEGER PRIMARY KEY NOT NULL, countryId INTEGER NOT NULL UNIQUE);',
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
        favsDB.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM table_favorites',
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
        favsDB.transaction(tx => {
            tx.executeSql(
                `INSERT INTO table_favorites (countryId) VALUES (?);`,
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
        favsDB.transaction(tx => {
            tx.executeSql(
                `DELETE FROM table_favorites WHERE countryId = ?;`,
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

// SCORE DATABASE
export const initScore = () => {
  const promise = new Promise((resolve, reject) => {
    scoresDB.transaction(tx => {
      tx.executeSql(
        //'DROP TABLE IF EXISTS table_scores;',
        'CREATE TABLE IF NOT EXISTS table_scores (id INTEGER PRIMARY KEY NOT NULL, userId INTEGER NOT NULL UNIQUE, userName VARCHAR(255), totalScore INTEGER, totalNum INTEGER, time INTEGER, date VARCHAR(255));',
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

export const fetchScores = () => {
  const promise = new Promise((resolve, reject) => {
      scoresDB.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM table_scores',
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

export const insertScore = (userId, userName, totalScore, totalNum, time, date) => {
  const promise = new Promise((resolve, reject) => {
      scoresDB.transaction(tx => {
          tx.executeSql(
              `INSERT INTO table_scores (userId, userName, totalScore, totalNum, time, date) VALUES (?,?,?,?,?,?);`,
              [userId, userName, totalScore, totalNum, time, date],
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

export const deleteScore = (userId) => {
  const promise = new Promise((resolve, reject) => {
      scoresDB.transaction(tx => {
          tx.executeSql(
              `DELETE FROM table_scores WHERE userId = ?;`,
              [userId],
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