import { FavoritesContext } from '@features/Favorites';
import { deleteFromFavorites } from '@features/Favorites/model/deleteFromFavorites';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { fetchFavorites } from './fetchFavorites';
import { AlertsContext, createAlert } from '@shared/model';
import axios from 'axios';
import { downloadTextFile, uploadJsonFile } from '@shared/lib';
import { addToFavorites } from '@features/Favorites/model/addToFavorites';
import { downloadJsonFile } from '@shared/lib/downloadJsonFile';
import { vacanciesToText } from '@entities/Vacancy';

export const useFavoritesActions = (ids: string[], setIds: Dispatch<SetStateAction<string[]>>) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { alertsStore } = useContext(AlertsContext);
  const { favoritesStore } = useContext(FavoritesContext);
  const controller = new AbortController();
  const signal = controller.signal;

  const handleDeleteFavorites = () => {
    setModalOpen(false);
    deleteFromFavorites(ids);
    setIds([]);
    favoritesStore.updateFavorites([]);
  }

  const handleDownloadFavorites = async () => {
    setIsLoading(true);
    try {
      const favorites = await fetchFavorites(ids, signal, alertsStore, favoritesStore, setProgress);
      const text = vacanciesToText(favorites);
      downloadTextFile(text, 'favorites');
      setIsLoading(false);
    } catch (e) {
      if (axios.isCancel(e)) return;
      setIsLoading(false);
    } finally {
      setProgress(0);
    }
  }

  const handleExportFavorites = () => {
    const jsonContent = JSON.stringify(ids);
    downloadJsonFile(jsonContent, 'favorites');
  }

  const handleImportFavorites = () => {
    uploadJsonFile().then(parsedIds => {
      for (const id of parsedIds) {
        addToFavorites(id);
      }
      favoritesStore.updateFavorites(ids);
      setIds(prev => {
        return [...new Set([...prev, ...parsedIds])];
      });
    }).catch(e => alertsStore.addAlert(createAlert(e.message, 'error')));
  }

  return { 
    modalOpen, 
    setModalOpen, 
    progress, 
    isLoading,
    handleDeleteFavorites, 
    handleDownloadFavorites, 
    handleExportFavorites, 
    handleImportFavorites
  }
}
