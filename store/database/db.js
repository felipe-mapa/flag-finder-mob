import * as SQLite from 'expo-sqlite';

const scoresDB = SQLite.openDatabase('scores.db');
const favsDB = SQLite.openDatabase('favorites.db');

// FAV DATABASE
export const initFav = () => {
  const promise = new Promise((resolve, reject) => {
    favsDB.transaction(tx => {
      tx.executeSql(
        //'DROP TABLE IF EXISTS table_favorites;',
        'CREATE TABLE IF NOT EXISTS table_favorites (id INTEGER PRIMARY KEY NOT NULL, countrySlug INTEGER NOT NULL UNIQUE);',
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

export const insertFav = (countrySlug) => {
    const promise = new Promise((resolve, reject) => {
        favsDB.transaction(tx => {
            tx.executeSql(
                `INSERT INTO table_favorites (countrySlug) VALUES (?);`,
                [countrySlug],
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

export const deleteFav = (countrySlug) => {
    const promise = new Promise((resolve, reject) => {
        favsDB.transaction(tx => {
            tx.executeSql(
                `DELETE FROM table_favorites WHERE countrySlug = ?;`,
                [countrySlug],
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
        // 'DROP TABLE IF EXISTS table_score;',
        'CREATE TABLE IF NOT EXISTS table_score (id INTEGER PRIMARY KEY NOT NULL, playerId INTEGER NOT NULL UNIQUE, userName VARCHAR(255), totalScore INTEGER, totalNum INTEGER, time INTEGER, date VARCHAR(255));',
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
          'SELECT * FROM table_score',
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

export const insertScore = (playerId, userName, totalScore, totalNum, time, date) => {
  const promise = new Promise((resolve, reject) => {
      scoresDB.transaction(tx => {
          tx.executeSql(
              `INSERT INTO table_score (playerId, userName, totalScore, totalNum, time, date) VALUES (?,?,?,?,?,?);`,
              [playerId, userName, totalScore, totalNum, time, date],
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

export const deleteScore = (playerId) => {
  const promise = new Promise((resolve, reject) => {
      scoresDB.transaction(tx => {
          tx.executeSql(
              `DELETE FROM table_score WHERE playerId = ?;`,
              [playerId],
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