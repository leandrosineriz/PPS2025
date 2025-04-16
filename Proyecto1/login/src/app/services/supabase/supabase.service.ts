import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://dwwhednmndiphziaspwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3d2hlZG5tbmRpcGh6aWFzcHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MjkwMjYsImV4cCI6MjA2MDIwNTAyNn0.GaCEBsVHJuSiCBBiZgXP-LOWfoe1cFO9GAx4X6mvLJQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  
  constructor() { }

  login(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password })
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      })
      .catch(err => {
        console.error('Error during login:', err);
        throw err;
      });
  }
  
  // Cambia el nombre de la función a register para mayor claridad
  register(email: string, password: string) { 
    return supabase.auth.signUp({ email, password })
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      })
      .catch(err => {
        console.error('Error during registration:', err);
        throw err;
      });
  }
  logout() {
    return supabase.auth.signOut()
      .then(({ error }) => {
        if (error) throw error;
        return true;
      })
      .catch(err => {
        console.error('Error during logout:', err);
        throw err;
      });
  }
  getUser() {
    return supabase.auth.getUser()
      .then(({ data, error }) => {
        if (error) throw error;
        return data.user;
      })
      .catch(err => {
        console.error('Error getting user:', err);
        throw err;
      });
  }
}
