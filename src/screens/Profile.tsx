import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Button, MD3Theme, Text, TextInput, useTheme} from 'react-native-paper';
import useForm from '../utils/useForm';
import {useUser} from '../providers/UserProvider';

const Profile = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const {user} = useUser();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useForm({});

  const handleEdit = () => {
    setEditing(true);
  };
  const handleSave = () => {};

  return (
    <ScrollView>
      <View style={styles.card}>
        <Text variant="titleMedium">Profile</Text>
        <View style={{gap: 16}}>
          <TextInput
            readOnly={!editing}
            label="Nama"
            value={user?.name}
            onChangeText={value => setForm('name', value)}
          />
          <TextInput
            readOnly={!editing}
            label="Username"
            value={user?.username}
            onChangeText={value =>
              setForm('username', value.replace(/\s/g, ''))
            }
          />
          <Button
            onPress={editing ? handleSave : handleEdit}
            mode={editing ? 'contained' : 'contained-tonal'}>
            {editing ? 'Simpan' : 'Edit'}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      padding: 16,
      margin: 16,
      borderRadius: 8,
      elevation: 4,
      gap: 16,
    },
  });
