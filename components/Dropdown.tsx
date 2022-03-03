import { FC, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';
import { useThemeColor } from './Themed';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

interface ComponentProps {
    options: {
        label: string;
        value: string;
    }[];
    label: string;
    value: string;
    setValue: (value: string) => void;
}

export const Dropdown: FC<ComponentProps> = ({ label, options, value, setValue }) => {
    const modalRef = useRef<Modal>(null);
    const grey = useThemeColor('lightGrey');
    const white = useThemeColor('white');

    const open = () => {
        modalRef.current?.open();
    }

    const close = () => {
        modalRef.current?.close();
    }

    const onSelect = (value: string) => {
        setValue(value);
        close();
    }

    return (
        <View>
            <TouchableOpacity onPress={open} style={[styles.button, { backgroundColor: grey }]}>
                <Text style={[styles.text, { color: white }]}>{label}</Text>
                <AntDesign name="down" size={18} color={white} />
            </TouchableOpacity>
            <Modal useNativeDriver={false} coverScreen={true}
                position="bottom" keyboardTopOffset={0}
                style={[styles.modal, { height: options.length * 55 + 58 }]}
                ref={modalRef} swipeToClose={false}>
                <Picker
                    selectedValue={value}
                    onValueChange={onSelect}>
                    {options.map((option) =>
                        <Picker.Item key={option.value} label={option.label} value={option.value} />)}
                </Picker>
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    modal: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        minHeight: 70,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 130,
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 5,
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
        marginRight: 6,
    }
});