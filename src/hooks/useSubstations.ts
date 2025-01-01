import { useQuery } from '@tanstack/react-query';
import { Substation } from '../types/monitoring';
import supabase from '../services/supabaseClient';

export function useSubstations() {
  return useQuery({
    queryKey: ['substations'],
    queryFn: async () => {
      const { data, error } = await supabase.from('substations').select('*');
      if (error) throw new Error(error.message);

      console.log('Fetched Substations:', data);
      return data.map((substation: any) => {
        const locationMatch = substation.location.match(/\(([^,]+),([^,]+)\)/);
        const lat = locationMatch ? parseFloat(locationMatch[1]) : null;
        const lng = locationMatch ? parseFloat(locationMatch[2]) : null;

        return {
          ...substation,
          location: { lat, lng },
        };
      });
    },
    staleTime: 30000,  // Use staleTime to control refetching behavior
    cacheTime: 60000,  // Cache data for 1 minute before refetching
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
}
