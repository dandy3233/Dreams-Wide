import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Job = Database['public']['Tables']['jobs']['Row'];
type JobInsert = Database['public']['Tables']['jobs']['Insert'];
type JobUpdate = Database['public']['Tables']['jobs']['Update'];

interface JobState {
  jobs: Job[];
  loading: boolean;
  fetchJobs: () => Promise<void>;
  createJob: (job: JobInsert) => Promise<void>;
  updateJob: (id: string, job: JobUpdate) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
}

export const useJobStore = create<JobState>((set, get) => ({
  jobs: [],
  loading: false,

  fetchJobs: async () => {
  set({ loading: true });
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_at', { ascending: false });

    if (error) throw error;
    set({ jobs: data || [], loading: false });
  } catch (err) {
    console.error('Failed to fetch jobs:', err);
    set({ loading: false });
  }
},


  createJob: async (job: JobInsert) => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert(job)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        jobs: [data, ...state.jobs]
      }));
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  updateJob: async (id: string, job: JobUpdate) => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .update(job)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        jobs: state.jobs.map(j => j.id === id ? data : j)
      }));
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  deleteJob: async (id: string) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        jobs: state.jobs.filter(j => j.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  },
}));