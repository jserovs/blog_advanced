import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('test add blog', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <NewBlogForm createBlog={mockHandler} setBlogAddForm={() => {}}/>
  )

  const titleDiv = component.container.querySelector('.titleInput')
  const titleInput = titleDiv.querySelector('input')

  const authorInput = component.container.querySelector('#author')

  fireEvent.change(titleInput,
    {
      target:
                { value: 'as an unitTest I write  blogs' }
    })

  fireEvent.change(authorInput,
    {
      target:
                    { value: 'JEST' }
    })

  const saveButton = component.getByText('save')
  fireEvent.click(saveButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('as an unitTest I write  blogs')
  expect(mockHandler.mock.calls[0][0].author).toBe('JEST')

})