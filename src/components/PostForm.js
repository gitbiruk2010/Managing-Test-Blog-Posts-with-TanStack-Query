import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { createPost, updatePost, patchPost } from '../api/api';

const PostForm = ({ post, onSubmit, isPatch = false }) => {
  const queryClient = useQueryClient(); // Initialize queryClient
  const [title, setTitle] = useState(post ? post.title : ''); // State to manage the post title
  const [body, setBody] = useState(post ? post.body : ''); // State to manage the post body

  // Mutation for creating, updating, or patching posts
  const mutation = useMutation({
    mutationFn: post ? (isPatch ? (data) => patchPost(post.id, data) : (data) => updatePost({...post, ...data})) : createPost,
    onSuccess: (data) => {
      console.log('Mutation successful:', data);
      queryClient.invalidateQueries(['posts']); // Invalidate the 'posts' query to refetch data
      onSubmit(); // Call the onSubmit callback to change the view
    },
    onError: (err) => {
      console.error("Error in mutation:", err);
    }
  });

  // Handle form submission
  const handleSubmit = () => {
    console.log('Submit button clicked');
    if (isPatch) {
      console.log('Patching post ID:', post.id, 'with title:', title);
      mutation.mutate({ title });
    } else if (post) {
      console.log('Updating post ID:', post.id, 'with title:', title, 'and body:', body);
      mutation.mutate({ ...post, title, body });
    } else {
      console.log('Creating new post with title:', title, 'and body:', body);
      mutation.mutate({ title, body, userId: 1 });
    }
  };

  return (
    <View style={styles.container}>
      {/* Input field for the post title */}
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      {/* Conditional input field for the post body, only shown if not patching */}
      {!isPatch && (
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Body"
          value={body}
          onChangeText={setBody}
          multiline
        />
      )}
      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Cancel" onPress={onSubmit} />
    </View>
  );
};

// Styles for the PostForm component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  textArea: {
    height: 100,
  },
});

export default PostForm;
