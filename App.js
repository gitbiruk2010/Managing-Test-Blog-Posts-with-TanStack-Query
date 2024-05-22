import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostList from './src/components/PostList';
import PostForm from './src/components/PostForm';

// Initialize a new QueryClient instance for TanStack Query
const queryClient = new QueryClient();

export default function App() {
  // State to manage the current view ('list' or 'form')
  const [view, setView] = useState('list');  
  // State to manage the post being edited or added
  const [currentPost, setCurrentPost] = useState(null);
  // State to indicate if the post is being patched
  const [isPatch, setIsPatch] = useState(false);

  // Handle editing a post, setting the view to 'form'
  const handleEdit = (post, patch = false) => {
    setCurrentPost(post);
    setIsPatch(patch);
    setView('form');
  };

  // Handle adding a new post, setting the view to 'form'
  const handleAddNew = () => {
    setCurrentPost(null);
    setIsPatch(false);
    setView('form');
  };

  // Handle form submission, setting the view back to 'list'
  const handleSubmit = () => {
    setView('list');
  };

  return (
    // Provide the QueryClient to the app
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        {view === 'list' ? (
          // Render the PostList component if the view is 'list'
          <PostList onEdit={handleEdit} onAddNew={handleAddNew} />
        ) : (
          // Render the PostForm component if the view is 'form'
          <PostForm post={currentPost} onSubmit={handleSubmit} isPatch={isPatch} />
        )}
        <StatusBar style="auto" />
      </View>
    </QueryClientProvider>
  );
}

// Styles for the container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, // Adding padding to avoid the notification area
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
