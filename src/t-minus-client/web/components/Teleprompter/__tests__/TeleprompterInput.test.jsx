import Colors from '../../../../shared/constants/Colors'
import ConnectedTeleprompterInput from '../TeleprompterInput'
import emptyFn from 'empty/function'
import { mount, shallow } from 'enzyme'

const TeleprompterInput = ConnectedTeleprompterInput.WrappedComponent

describe('TeleprompterInput', () => {
  it('has a default state', () => {
    const component = shallow(
      <TeleprompterInput/>
    )
    expect(component.state()).toEqual({ focus: false, value: '' })
  })

  it('changes state when focused', () => {
    const component = shallow(
      <TeleprompterInput/>
    )
    component.find('input').simulate('focus')
    expect(component.state().focus).toBe(true)
  })

  it('changes the background color when focused', () => {
    const component = shallow(
      <TeleprompterInput/>
    )
    expect(component.find('input').node.props.style.background).toBe('transparent')
    component.find('input').simulate('focus')
    expect(component.find('input').node.props.style.background).toBe(Colors.WetAsphalt)
  })

  it('changes state when blurred', () => {
    const component = shallow(
      <TeleprompterInput setTeleprompterValue={emptyFn}/>
    )
    component.find('input').simulate('focus')
    component.find('input').simulate('blur')
    expect(component.state().focus).toBe(false)
  })

  it('resets the prompter text when blurred with an empty value', () => {
    const setTeleprompterValue = jest.fn()
    const component = shallow(
      <TeleprompterInput setTeleprompterValue={setTeleprompterValue}/>
    )
    component.find('input').simulate('blur')
    expect(setTeleprompterValue).toHaveBeenCalledWith('')
  })

  it('does not reset the prompter text when blurred without an empty value', () => {
    const setTeleprompterValue = jest.fn()
    const component = shallow(
      <TeleprompterInput setTeleprompterValue={setTeleprompterValue}/>
    )
    component.find('input').simulate('change', { target: { value: 'TEST' } })
    component.find('input').simulate('blur')
    expect(setTeleprompterValue).not.toHaveBeenCalledWith('')
  })

  it('retains the value of the INPUT when changed', () => {
    const component = shallow(
      <TeleprompterInput setTeleprompterValue={emptyFn}/>
    )
    component.find('input').simulate('change', { target: { value: 'TEST' } })
    expect(component.state().value).toBe('TEST')
  })

  it('adjusts the width of the INPUT when changed', () => {
    const component = shallow(
      <TeleprompterInput setTeleprompterValue={emptyFn}/>
    )
    component.find('input').simulate('change', { target: { value: 'TEST' } })
    expect(component.find('input').node.props.style.width).toBe('7ch')
  })

  it('sets the teleprompter text when submitted', () => {
    const setTeleprompterValue = jest.fn()
    const component = mount(
      <TeleprompterInput setTeleprompterValue={setTeleprompterValue}/>
    )
    component.find('input').simulate('change', { target: { value: 'TEST' } })
    component.find('input').simulate('submit')
    expect(setTeleprompterValue).toHaveBeenCalledWith('TEST')
  })
})
