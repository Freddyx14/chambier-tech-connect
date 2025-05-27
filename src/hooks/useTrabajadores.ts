
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Trabajador, Resena, TrabajadorConResenas } from '@/types/trabajador';
import { useToast } from '@/hooks/use-toast';

export const useTrabajadores = () => {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTrabajadores = async () => {
    try {
      const { data, error } = await supabase
        .from('trabajadores')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTrabajadores(data || []);
    } catch (error) {
      console.error('Error fetching trabajadores:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los trabajadores',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrabajadores();

    // Configurar realtime para escuchar cambios
    const channel = supabase
      .channel('trabajadores-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trabajadores'
        },
        () => {
          console.log('Trabajadores data changed, refetching...');
          fetchTrabajadores();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { trabajadores, loading, refetch: fetchTrabajadores };
};

export const useTrabajador = (id: string) => {
  const [trabajador, setTrabajador] = useState<TrabajadorConResenas | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTrabajador = async () => {
    try {
      // Fetch trabajador
      const { data: trabajadorData, error: trabajadorError } = await supabase
        .from('trabajadores')
        .select('*')
        .eq('id', id)
        .single();

      if (trabajadorError) throw trabajadorError;

      // Fetch reseñas
      const { data: resenasData, error: resenasError } = await supabase
        .from('resenas')
        .select('*')
        .eq('id_trabajador', id)
        .order('fecha', { ascending: false });

      if (resenasError) throw resenasError;

      const trabajadorConResenas: TrabajadorConResenas = {
        ...trabajadorData,
        resenas: resenasData || []
      };

      setTrabajador(trabajadorConResenas);
    } catch (error) {
      console.error('Error fetching trabajador:', error);
      toast({
        title: 'Error',
        description: 'No se pudo cargar el trabajador',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTrabajador();

      // Configurar realtime para escuchar cambios en el trabajador y sus reseñas
      const channel = supabase
        .channel(`trabajador-${id}-changes`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'trabajadores',
            filter: `id=eq.${id}`
          },
          () => {
            console.log('Trabajador data changed, refetching...');
            fetchTrabajador();
          }
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'resenas',
            filter: `id_trabajador=eq.${id}`
          },
          () => {
            console.log('Reseñas changed, refetching...');
            fetchTrabajador();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [id]);

  return { trabajador, loading, refetch: fetchTrabajador };
};
