import reactNativeBcrypt from 'react-native-bcrypt';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

interface User {
  user_id: number;
  name: string;
  username: string;
  password: string;
}

interface Report {
  report_id: number;
  title: string;
  content: string;
  user_id: number;
}

// Membuat fungsi untuk membuka database
const openDatabase = async () => {
  try {
    const db = await SQLite.openDatabase({
      name: 'my_report.db',
      location: 'default',
    });
    console.log('Database opened successfully');
    return db;
  } catch (error) {
    console.log('Failed to open database:', error);
  }
};

// Membuat fungsi untuk membuat database dan tabel
export const createDatabase = async () => {
  try {
    const db = await openDatabase();

    await db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, username TEXT UNIQUE, password TEXT)',
      );
    });

    console.log('Database and table created successfully');
  } catch (error) {
    console.log('Error creating database:', error);
  }
};

// Membuat fungsi untuk menghapus database
export const deleteDatabase = async () => {
  try {
    const db = await openDatabase();

    await db.transaction(tx => {
      tx.executeSql('DROP TABLE IF EXISTS users');
    });

    console.log('Database deleted successfully');
  } catch (error) {
    console.log('Error deleting database:', error);
  }
};

// Membuat fungsi untuk cek username sudah terdaftar atau belum
const checkUsernameExists = async (username: string) => {
  const db = await openDatabase();
  try {
    const result = await db.executeSql(
      'SELECT COUNT(*) AS count FROM users WHERE username = ?',
      [username],
    );
    const row = result[0].rows.item(0);
    return row.count > 0;
  } catch (error) {
    console.error('Error checking username:', error);
  }
  return false;
};

// Membuat fungsi untuk menambahkan data user
export const registerUser = async ({
  name,
  username,
  password,
}: {
  name: string;
  username: string;
  password: string;
}) => {
  const db = await openDatabase();
  const usernameExists = await checkUsernameExists(username);

  if (usernameExists) {
    return {
      error: true,
      message: 'Username sudah terdaftar',
    };
  }

  try {
    await db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (name, username, password) VALUES (?, ?, ?)',
        [name, username, password],
      );
    });
    return {
      error: false,
      message: 'Pendaftaran berhasil',
    };
  } catch (error) {
    console.log('Error adding user:', error);
  }
};

// Membuat fungsi untuk login user
export const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const db = await openDatabase();
  try {
    const result = await db.executeSql(
      'SELECT * FROM users WHERE username = ?',
      [username],
    );
    const user = result[0].rows.item(0) as User;

    if (!user) {
      return {
        error: true,
        message: 'Username tidak ditemukan',
      };
    }
    const passwordMatch = await new Promise<boolean>((resolve, reject) => {
      reactNativeBcrypt.compare(password, user.password, function (err, res) {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });

    if (passwordMatch) {
      return {
        error: false,
        message: 'Login berhasil',
        user,
      };
    } else {
      return {
        error: true,
        message: 'Password salah',
      };
    }
  } catch (error) {
    console.log('Error login user:', error);
  }
};

// Membuat fungsi untuk update data user
export const updateUser = async ({
  user_id,
  name,
  username,
  password,
}: {
  user_id: number;
  name: string;
  username: string;
  password: string;
}) => {
  const db = await openDatabase();

  try {
    await db.transaction(tx => {
      tx.executeSql(
        'UPDATE users SET name = ?, username = ?, password = ? WHERE user_id = ?',
        [name, username, password, user_id],
      );
    });
    return {
      error: false,
      message: 'Update berhasil',
    };
  } catch (error) {
    console.log('Error updating user:', error);
  }
};
