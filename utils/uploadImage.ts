import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../supabase/supabaseClient';
import { decode } from 'base64-arraybuffer';

export async function uploadImage(userId: string): Promise<string | null> {
  const result = await ImagePicker.launchImageLibraryAsync({ base64: true });

  if (result.cancelled || !result.base64) return null;
  const { base64 } = result;
  const fileName = `checkins/${userId}_${Date.now()}.jpg`;
  const { error } = await supabase.storage
    .from('checkins')
    .upload(fileName, decode(base64), {
      contentType: 'image/jpeg',
      upsert: true,
    });
  if (error) return null;
  return fileName;
}
