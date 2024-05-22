import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { View, Text, Button, StyleSheet, ScrollView, TextInput } from 'react-native';
import { fetchPosts, deletePost, fetchPostsByUser } from '../api/api';

const PostList = ({ onEdit, onAddNew }) => {
  const queryClient = useQueryClient(); // Initialize queryClient
  const [userId, setUserId] = useState(''); // State to manage user ID for filtering

  // Fetch posts based on userId using useQuery hook
  const { data: posts, error, isLoading } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => (userId ? fetchPostsByUser(userId) : fetchPosts()),
  });

  // Mutation for deleting posts
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, postId) => {
      queryClient.setQueryData(['posts', userId], (oldData) =>
        oldData ? oldData.filter((post) => post.id !== postId) : []
      );
    },
    onError: (err) => {
      console.error("Error deleting post:", err);
    }
  });

  // Handle changes in the filter input
  const handleFilterChange = (value) => {
    setUserId(value);
  };

  // Display loading message
  if (isLoading) return <Text>Loading...</Text>;
  // Display error message
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Title for the filter section */}
      <Text style={styles.header}>Managing Test Blog Posts with TanStack Query</Text>
      {/* Input field for filtering posts by user ID */}
      <TextInput
        style={styles.input}
        placeholder="Filter by User ID"
        value={userId}
        onChangeText={handleFilterChange}
      />
      {/* List of posts */}
      {posts.map(post => (
        <View key={post.id} style={styles.post}>
          <Text style={styles.title}>{post.title}</Text>
          <Text>{post.body}</Text>
          <Text>User ID: {post.userId}</Text>
          <Button title="Edit" onPress={() => onEdit(post)} />
          <Button title="Patch" onPress={() => onEdit(post, true)} />
          <Button title="Delete" onPress={() => deleteMutation.mutate(post.id)} />
        </View>
      ))}
      <Button title="Add New Post" onPress={onAddNew} />
    </ScrollView>
  );
};

// Styles for the PostList component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fafafa', // Light grey background
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#262626' // Dark grey text
  },
  post: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff', // White post background
    borderRadius: 10, // Rounded corners for the posts
    borderWidth: 1,
    borderColor: '#dbdbdb' // Light border for the posts
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#262626' // Dark grey text
  },
  input: {
    height: 40,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5 // Rounded corners for input fields
  },
});

export default PostList;
