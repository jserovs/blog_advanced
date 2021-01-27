import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    likes: '99999',
    url: 'test url'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const blogTitle = component.container.querySelector('.blogTitle')
  expect(blogTitle).toHaveTextContent('test blog')
  const blogAuthor = component.container.querySelector('.blogAuthor')
  expect(blogAuthor).toHaveTextContent('test author')

  // check if blog details are hidden
  const blogDetails = component.container.querySelector('.blogDetails')
  expect(blogDetails).toHaveStyle('display: none;')

  // check if the blog details contain url and likes
  const blogUrl = blogDetails.querySelector('.blogUrl')
  expect(blogUrl).toHaveTextContent('test url')
  const blogLikes = blogDetails.querySelector('.blogLikes')
  expect(blogLikes).toHaveTextContent('99999')

})

test('renders content, show details', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    likes: '99999',
    url: 'test url'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('show details')
  fireEvent.click(button)

  const blogDetails = component.container.querySelector('.blogDetails')
  expect(blogDetails).not.toHaveStyle('display: none')


})

test('test like button', async () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    likes: '3',
    url: 'test url'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} loginToken='token' likeBlog={mockHandler}/>
  )
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})