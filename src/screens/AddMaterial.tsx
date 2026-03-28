import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Switch,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../layouts/Stacknavigation';
import {materialApi, MaterialTrack} from '../api/Api';
import {useTheme, ThemeColors} from '../context/ThemeContext';

type IconName = React.ComponentProps<typeof MaterialDesignIcons>['name'];

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'AddMaterial'>;
  route: RouteProp<RootStackParamList, 'AddMaterial'>;
};

type FormData = {
  cust_name: string;
  cust_contact: string;
  case_id: string;
  so_number: string;
  warranty: boolean;
  issue: string;
  product: string;
  model_name: string;
  part_number: string;
  serial_number: string;
  qty: string;
  hp_part_in_date: string;
  aging: string;
  out_date: string;
  collector: string;
  in_date: string;
  receiver: string;
  used_part: boolean;
  remarks: string;
};

const emptyForm: FormData = {
  cust_name: '',
  cust_contact: '',
  case_id: '',
  so_number: '',
  warranty: false,
  issue: '',
  product: '',
  model_name: '',
  part_number: '',
  serial_number: '',
  qty: '0',
  hp_part_in_date: '',
  aging: '',
  out_date: '',
  collector: '',
  in_date: '',
  receiver: '',
  used_part: false,
  remarks: '',
};

const materialToForm = (m: MaterialTrack): FormData => ({
  cust_name: m.cust_name,
  cust_contact: m.cust_contact,
  case_id: m.case_id,
  so_number: m.so_number,
  warranty: m.warranty,
  issue: m.issue,
  product: m.product,
  model_name: m.model_name,
  part_number: m.part_number,
  serial_number: m.serial_number,
  qty: String(m.qty),
  hp_part_in_date: m.hp_part_in_date || '',
  aging: m.aging != null ? String(m.aging) : '',
  out_date: m.out_date || '',
  collector: m.collector,
  in_date: m.in_date || '',
  receiver: m.receiver,
  used_part: m.used_part,
  remarks: m.remarks,
});

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'phone-pad';
  icon?: IconName;
  colors: ThemeColors;
  isDark: boolean;
};

const FormField = ({label, value, onChangeText, placeholder, keyboardType = 'default', icon, colors, isDark}: FieldProps) => (
  <View className="mb-4">
    <Text className="mb-2 text-sm font-bold" style={{color: colors.text}}>{label}</Text>
    <View
      style={{
        borderWidth: 1.5,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
      }}
      className="flex-row items-center rounded-2xl px-4 py-3.5">
      {icon && (
        <View
          className="mr-3 h-8 w-8 items-center justify-center rounded-xl"
          style={{backgroundColor: isDark ? '#312E81' : '#EEF2FF'}}>
          <MaterialDesignIcons name={icon} size={16} color={isDark ? '#818CF8' : '#6366F1'} />
        </View>
      )}
      <TextInput
        className="flex-1 p-0 text-base font-semibold"
        style={{color: colors.text}}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

type SwitchFieldProps = {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  icon?: IconName;
  colors: ThemeColors;
  isDark: boolean;
};

const SwitchField = ({label, value, onValueChange, icon, colors, isDark}: SwitchFieldProps) => (
  <View className="mb-4">
    <View
      style={{
        borderWidth: 1.5,
        borderColor: value ? (isDark ? '#4338CA' : '#C7D2FE') : colors.border,
        backgroundColor: value ? (isDark ? '#1E1B4B' : '#FAFAFE') : colors.surface,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
      }}
      className="flex-row items-center justify-between rounded-2xl px-4 py-3.5">
      <View className="flex-row items-center">
        {icon && (
          <View
            className="mr-3 h-8 w-8 items-center justify-center rounded-xl"
            style={{backgroundColor: isDark ? (value ? '#312E81' : '#1E293B') : (value ? '#E0E7FF' : '#EEF2FF')}}>
            <MaterialDesignIcons name={icon} size={16} color={value ? '#4F46E5' : (isDark ? '#818CF8' : '#6366F1')} />
          </View>
        )}
        <View>
          <Text className="text-sm font-bold" style={{color: colors.text}}>{label}</Text>
          <Text className="text-xs" style={{color: colors.textMuted}}>{value ? 'Enabled' : 'Disabled'}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{false: isDark ? '#475569' : '#E5E7EB', true: '#818CF8'}}
        thumbColor={value ? '#4F46E5' : (isDark ? '#94A3B8' : '#F9FAFB')}
      />
    </View>
  </View>
);

type SectionProps = {
  title: string;
  icon: IconName;
  subtitle: string;
  colors: ThemeColors;
  isDark: boolean;
};

const SectionHeader = ({title, icon, subtitle, colors, isDark}: SectionProps) => (
  <View className="mb-5 mt-3">
    <View className="flex-row items-center">
      <View style={sectionStyles.iconBox} className="mr-3 h-10 w-10 items-center justify-center rounded-xl">
        <MaterialDesignIcons name={icon} size={20} color="#FFFFFF" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-extrabold" style={{color: colors.text}}>{title}</Text>
        <Text className="text-xs font-medium" style={{color: colors.textMuted}}>{subtitle}</Text>
      </View>
    </View>
    <View className="mt-3" style={{height: 2, backgroundColor: isDark ? '#334155' : '#EEF2FF', borderRadius: 1}} />
  </View>
);

const sectionStyles = StyleSheet.create({
  iconBox: {
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
});

type DeleteModalProps = {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
  colors: ThemeColors;
  isDark: boolean;
};

const DeleteModal = ({visible, onCancel, onDelete, colors, isDark}: DeleteModalProps) => (
  <Modal visible={visible} transparent animationType="fade">
    <TouchableWithoutFeedback onPress={onCancel}>
      <View style={[modalStyles.overlay, {backgroundColor: colors.overlay}]}>
        <TouchableWithoutFeedback>
          <View style={[modalStyles.box, {backgroundColor: colors.surface}]}>
            <View className="mb-4 self-center rounded-full p-4" style={{backgroundColor: isDark ? '#3B1A1A' : '#FEF2F2'}}>
              <MaterialDesignIcons name="trash-can-outline" size={28} color="#EF4444" />
            </View>
            <Text className="mb-1 text-center text-lg font-extrabold" style={{color: colors.text}}>
              Delete Material?
            </Text>
            <Text className="mb-6 text-center text-sm font-medium" style={{color: colors.textMuted}}>
              This action cannot be undone. The material will be permanently removed.
            </Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 items-center rounded-2xl py-3.5"
                style={{borderWidth: 2, borderColor: colors.border}}
                activeOpacity={0.7}
                onPress={onCancel}>
                <Text className="text-sm font-bold" style={{color: colors.textSecondary}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 items-center rounded-2xl bg-red-500 py-3.5"
                activeOpacity={0.7}
                style={modalStyles.deleteBtn}
                onPress={onDelete}>
                <Text className="text-sm font-bold text-white">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderRadius: 24,
    width: '85%',
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  deleteBtn: {
    shadowColor: '#EF4444',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});

const AddMaterial = ({navigation, route}: Props) => {
  const {colors, isDark} = useTheme();
  const existing = route.params?.material;
  const isEditing = !!existing;
  const [form, setForm] = useState<FormData>(
    existing ? materialToForm(existing as MaterialTrack) : emptyForm,
  );
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({...prev, [field]: value}));
  };

  const buildPayload = (): Omit<MaterialTrack, 'id'> => ({
    cust_name: form.cust_name,
    cust_contact: form.cust_contact,
    case_id: form.case_id,
    so_number: form.so_number,
    warranty: form.warranty,
    issue: form.issue,
    product: form.product,
    model_name: form.model_name,
    part_number: form.part_number,
    serial_number: form.serial_number,
    qty: parseInt(form.qty, 10) || 0,
    hp_part_in_date: form.hp_part_in_date || null,
    aging: form.aging ? parseInt(form.aging, 10) : null,
    out_date: form.out_date || null,
    collector: form.collector,
    in_date: form.in_date || null,
    receiver: form.receiver,
    used_part: form.used_part,
    remarks: form.remarks,
  });

  const handleSave = async () => {
    if (!form.cust_name.trim() || !form.case_id.trim()) {
      return;
    }
    setSaving(true);
    try {
      const payload = buildPayload();
      if (isEditing && existing) {
        await materialApi.update((existing as MaterialTrack).id, {...payload, id: (existing as MaterialTrack).id});
      } else {
        await materialApi.create(payload);
      }
      navigation.goBack();
    } catch (e: any) {
      const detail = e.response?.data;
      console.error('Failed to save:', detail || e.message);
      if (detail) {
        const messages = Object.entries(detail)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
          .join('\n');
        console.error('Validation errors:\n' + messages);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleNew = () => {
    setForm(emptyForm);
  };

  const handleDelete = () => {
    if (existing) {
      setShowDeleteModal(true);
    } else {
      navigation.goBack();
    }
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    if (existing) {
      try {
        await materialApi.delete((existing as MaterialTrack).id);
      } catch (e) {
        console.error('Failed to delete:', e);
      }
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: colors.background}}>
      {/* Header */}
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.surface,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.06,
          shadowRadius: 6,
          elevation: 3,
        }}
        className="flex-row items-center px-4 py-4">
        <TouchableOpacity
          className="mr-3 h-10 w-10 items-center justify-center rounded-xl"
          style={{backgroundColor: isDark ? '#334155' : '#111827'}}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <MaterialDesignIcons name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-xl font-extrabold" style={{color: colors.text}}>
            {isEditing ? 'Edit Material' : 'New Material'}
          </Text>
          <Text className="text-xs font-medium" style={{color: colors.textMuted}}>
            {isEditing ? 'Update the details below' : 'Fill in all the required fields'}
          </Text>
        </View>
        {isEditing && (
          <View style={styles.editBadge} className="rounded-full px-3 py-1.5">
            <Text className="text-xs font-extrabold text-white">EDITING</Text>
          </View>
        )}
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pt-5 pb-10"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

        <SectionHeader title="Customer Info" icon="account-outline" subtitle="Customer and case details" colors={colors} isDark={isDark} />
        <FormField label="Customer Name" value={form.cust_name} onChangeText={v => updateField('cust_name', v)} icon="account" colors={colors} isDark={isDark} />
        <FormField label="Customer Contact" value={form.cust_contact} onChangeText={v => updateField('cust_contact', v)} keyboardType="phone-pad" icon="phone-outline" colors={colors} isDark={isDark} />
        <FormField label="Case ID" value={form.case_id} onChangeText={v => updateField('case_id', v)} icon="identifier" colors={colors} isDark={isDark} />
        <FormField label="SO Number" value={form.so_number} onChangeText={v => updateField('so_number', v)} icon="file-document-outline" colors={colors} isDark={isDark} />
        <SwitchField label="Warranty" value={form.warranty} onValueChange={v => updateField('warranty', v)} icon="shield-check-outline" colors={colors} isDark={isDark} />
        <FormField label="Issue" value={form.issue} onChangeText={v => updateField('issue', v)} icon="alert-circle-outline" colors={colors} isDark={isDark} />

        <SectionHeader title="Product Details" icon="cube-outline" subtitle="Product identification info" colors={colors} isDark={isDark} />
        <FormField label="Product" value={form.product} onChangeText={v => updateField('product', v)} icon="package-variant" colors={colors} isDark={isDark} />
        <FormField label="Model Name" value={form.model_name} onChangeText={v => updateField('model_name', v)} icon="tag-outline" colors={colors} isDark={isDark} />
        <FormField label="Part Number" value={form.part_number} onChangeText={v => updateField('part_number', v)} icon="barcode" colors={colors} isDark={isDark} />
        <FormField label="Serial Number" value={form.serial_number} onChangeText={v => updateField('serial_number', v)} icon="numeric" colors={colors} isDark={isDark} />
        <FormField label="Qty" value={form.qty} onChangeText={v => updateField('qty', v)} keyboardType="numeric" icon="counter" colors={colors} isDark={isDark} />

        <SectionHeader title="Logistics" icon="truck-outline" subtitle="Dates, dispatch and receiving" colors={colors} isDark={isDark} />
        <FormField label="HP Part In Date" value={form.hp_part_in_date} onChangeText={v => updateField('hp_part_in_date', v)} placeholder="YYYY-MM-DD" icon="calendar-arrow-right" colors={colors} isDark={isDark} />
        <FormField label="Aging (days)" value={form.aging} onChangeText={v => updateField('aging', v)} keyboardType="numeric" icon="clock-outline" colors={colors} isDark={isDark} />
        <FormField label="Out Date" value={form.out_date} onChangeText={v => updateField('out_date', v)} placeholder="YYYY-MM-DD" icon="calendar-export" colors={colors} isDark={isDark} />
        <FormField label="Collector" value={form.collector} onChangeText={v => updateField('collector', v)} icon="account-arrow-left" colors={colors} isDark={isDark} />
        <FormField label="In Date" value={form.in_date} onChangeText={v => updateField('in_date', v)} placeholder="YYYY-MM-DD" icon="calendar-import" colors={colors} isDark={isDark} />
        <FormField label="Receiver" value={form.receiver} onChangeText={v => updateField('receiver', v)} icon="account-arrow-right" colors={colors} isDark={isDark} />
        <SwitchField label="Used Part" value={form.used_part} onValueChange={v => updateField('used_part', v)} icon="recycle" colors={colors} isDark={isDark} />
        <FormField label="Remarks" value={form.remarks} onChangeText={v => updateField('remarks', v)} icon="comment-text-outline" colors={colors} isDark={isDark} />

        {/* Action Buttons */}
        <View className="mt-8 flex-row gap-3">
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center rounded-2xl py-4"
            style={{
              backgroundColor: colors.surface,
              borderWidth: 2,
              borderColor: colors.border,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 1,
            }}
            activeOpacity={0.7}
            onPress={handleNew}>
            <MaterialDesignIcons name="plus" size={18} color={colors.textSecondary} />
            <Text className="ml-2 text-sm font-extrabold" style={{color: colors.text}}>New</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-[2] flex-row items-center justify-center rounded-2xl py-4"
            activeOpacity={0.85}
            style={styles.saveBtn}
            onPress={handleSave}
            disabled={saving}>
            {saving ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <>
                <MaterialDesignIcons name="content-save-outline" size={18} color="#FFFFFF" />
                <Text className="ml-2 text-sm font-extrabold text-white">Save Material</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="mt-3 flex-row items-center justify-center rounded-2xl py-4"
          style={{
            backgroundColor: isDark ? '#3B1A1A' : '#FEF2F2',
            borderWidth: 1.5,
            borderColor: isDark ? '#7F1D1D' : '#FECACA',
          }}
          activeOpacity={0.7}
          onPress={handleDelete}>
          <MaterialDesignIcons name="trash-can-outline" size={18} color="#DC2626" />
          <Text className="ml-2 text-sm font-extrabold" style={{color: '#DC2626'}}>
            {isEditing ? 'Delete Material' : 'Discard'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <DeleteModal
        visible={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onDelete={confirmDelete}
        colors={colors}
        isDark={isDark}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  editBadge: {
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  saveBtn: {
    backgroundColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
});

export default AddMaterial;
