import React, {useState, useMemo, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import MaterialCard from '../components/MaterialCard';
import {materialApi} from '../api/Api';
import {useTheme, ThemeColors} from '../context/ThemeContext';
import type {Material} from '../types/Material';
import type {RootStackParamList} from '../layouts/Stacknavigation';

const SORT_OPTIONS = ['Customer', 'Case ID', 'Qty'];

type Anchor = {y: number; x: number; w: number};

type DropdownProps = {
  visible: boolean;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
  anchor: Anchor;
  colors: ThemeColors;
  isDark: boolean;
};

const Dropdown = ({visible, options, selected, onSelect, onClose, anchor, colors, isDark}: DropdownProps) => {
  if (!visible) {
    return null;
  }
  return (
    <Modal visible transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1" style={{backgroundColor: colors.overlay}}>
          <View
            style={[
              dropdownStyles.menu,
              {
                top: anchor.y,
                left: anchor.x,
                width: anchor.w,
                backgroundColor: colors.surface,
                borderColor: colors.borderLight,
              },
            ]}>
            {options.map((opt, i) => (
              <TouchableOpacity
                key={opt}
                className="flex-row items-center px-4 py-3.5"
                style={i < options.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderLight} : undefined}
                activeOpacity={0.6}
                onPress={() => onSelect(opt)}>
                {selected === opt ? (
                  <View className="h-5 w-5 items-center justify-center rounded-full bg-indigo-500">
                    <MaterialDesignIcons name="check" size={13} color="#FFFFFF" />
                  </View>
                ) : (
                  <View className="h-5 w-5 rounded-full border-2" style={{borderColor: colors.border}} />
                )}
                <Text
                  className={`ml-3 text-sm ${
                    selected === opt ? 'font-bold' : 'font-medium'
                  }`}
                  style={{color: selected === opt ? (isDark ? '#818CF8' : '#4F46E5') : colors.textSecondary}}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const dropdownStyles = StyleSheet.create({
  menu: {
    position: 'absolute',
    borderRadius: 16,
    borderWidth: 1,
    elevation: 12,
    shadowColor: '#6366F1',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
});

type HeaderProps = {
  count: number;
  search: string;
  onSearchChange: (text: string) => void;
  sortBy: string;
  onSortPress: (x: number, y: number, w: number, h: number) => void;
  onAdd: () => void;
  colors: ThemeColors;
  isDark: boolean;
};

const ListHeader = ({
  count,
  search,
  onSearchChange,
  sortBy,
  onSortPress,
  onAdd,
  colors,
  isDark,
}: HeaderProps) => {
  const sortRef = useRef<View>(null);

  const handleSortPress = () => {
    sortRef.current?.measure((_x, _y, w, h, pageX, pageY) => {
      onSortPress(pageX, pageY, w, h);
    });
  };

  return (
    <View className="px-4 pb-3 pt-2">
      {/* Title section */}
      <View className="mb-1 flex-row items-center">
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-indigo-500">
          <MaterialDesignIcons name="diamond-stone" size={20} color="#FFFFFF" />
        </View>
        <View>
          <Text className="text-2xl font-extrabold" style={{color: colors.text}}>Materials</Text>
          <Text className="text-xs font-medium" style={{color: colors.textMuted}}>
            {count} tracking records
          </Text>
        </View>
      </View>

      {/* Add button */}
      <TouchableOpacity
        style={headerStyles.addBtn}
        className="mb-4 mt-4 flex-row items-center justify-center rounded-2xl py-4"
        activeOpacity={0.85}
        onPress={onAdd}>
        <View className="mr-2 h-6 w-6 items-center justify-center rounded-full bg-white/20">
          <MaterialDesignIcons name="plus" size={16} color="#FFFFFF" />
        </View>
        <Text className="text-base font-bold text-white">Add Material</Text>
      </TouchableOpacity>

      {/* Search */}
      <View
        style={{borderWidth: 1, borderColor: colors.inputBorder, backgroundColor: colors.inputBg}}
        className="mb-3 flex-row items-center rounded-2xl px-4 py-3">
        <MaterialDesignIcons name="magnify" size={20} color={colors.textMuted} />
        <TextInput
          className="ml-2 flex-1 p-0 text-sm"
          style={{color: colors.text}}
          placeholder="Search by customer, case ID, product..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={onSearchChange}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <MaterialDesignIcons name="close-circle" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Sort */}
      <View className="flex-row gap-3">
        <View ref={sortRef} className="flex-1" collapsable={false}>
          <TouchableOpacity
            className="flex-row items-center justify-between rounded-2xl px-4 py-3"
            style={{
              borderWidth: 1,
              borderColor: colors.borderLight,
              backgroundColor: colors.surface,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.04,
              shadowRadius: 4,
              elevation: 1,
            }}
            activeOpacity={0.7}
            onPress={handleSortPress}>
            <View className="flex-row items-center">
              <MaterialDesignIcons name="sort" size={16} color={isDark ? '#818CF8' : '#6366F1'} />
              <Text className="ml-2 text-sm font-medium" style={{color: colors.textSecondary}}>
                Sort: {sortBy}
              </Text>
            </View>
            <MaterialDesignIcons name="chevron-down" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Results label */}
      <Text className="mb-1 mt-4 text-xs font-bold uppercase tracking-wider" style={{color: colors.textMuted}}>
        Results
      </Text>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  addBtn: {
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
});

const Materials = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors, isDark} = useTheme();
  const [materialsList, setMaterialsList] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Customer');
  const [activeDropdown, setActiveDropdown] = useState<'sort' | null>(null);
  const [dropdownAnchor, setDropdownAnchor] = useState<Anchor>({y: 0, x: 0, w: 0});
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const fetchMaterials = useCallback(async () => {
    try {
      setLoading(true);
      const res = await materialApi.list();
      setMaterialsList(res.data);
    } catch (e) {
      console.error('Failed to fetch materials:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMaterials();
    }, [fetchMaterials]),
  );

  const filteredMaterials = useMemo(() => {
    let result = materialsList;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        m =>
          m.cust_name.toLowerCase().includes(q) ||
          m.case_id.toLowerCase().includes(q) ||
          m.product.toLowerCase().includes(q) ||
          (m.part_number && m.part_number.toLowerCase().includes(q)),
      );
    }

    result = [...result].sort((a, b) => {
      if (sortBy === 'Customer') return a.cust_name.localeCompare(b.cust_name);
      if (sortBy === 'Case ID') return a.case_id.localeCompare(b.case_id);
      return a.qty - b.qty;
    });

    return result;
  }, [materialsList, search, sortBy]);

  const handleDelete = (id: number) => {
    setDeleteTarget(id);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      try {
        await materialApi.delete(deleteTarget);
        setMaterialsList(prev => prev.filter(m => m.id !== deleteTarget));
      } catch (e) {
        console.error('Failed to delete:', e);
      }
      setDeleteTarget(null);
    }
  };

  const handleEdit = (material: Material) => {
    navigation.navigate('AddMaterial', {material});
  };

  const handleAdd = () => {
    navigation.navigate('AddMaterial');
  };

  const openDropdown = (type: 'sort', x: number, y: number, w: number, h: number) => {
    setDropdownAnchor({y: y + h + 4, x, w});
    setActiveDropdown(type);
  };

  const renderEmpty = () => (
    <View className="items-center px-4 py-16">
      {loading ? (
        <ActivityIndicator size="large" color="#6366F1" />
      ) : (
        <>
          <View
            className="mb-4 h-16 w-16 items-center justify-center rounded-full"
            style={{backgroundColor: colors.surfaceSecondary}}>
            <MaterialDesignIcons name="package-variant" size={32} color={colors.textMuted} />
          </View>
          <Text className="mb-1 text-base font-bold" style={{color: colors.textMuted}}>No materials found</Text>
          <Text className="text-center text-sm" style={{color: colors.textMuted}}>
            Try adjusting your search or add a new material
          </Text>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: colors.background}} edges={[]}>
      <FlatList
        data={filteredMaterials}
        keyExtractor={item => String(item.id)}
        ListHeaderComponent={
          <ListHeader
            count={filteredMaterials.length}
            search={search}
            onSearchChange={setSearch}
            sortBy={sortBy}
            onSortPress={(x, y, w, h) => openDropdown('sort', x, y, w, h)}
            onAdd={handleAdd}
            colors={colors}
            isDark={isDark}
          />
        }
        ListEmptyComponent={renderEmpty}
        renderItem={({item}) => (
          <MaterialCard
            material={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={{paddingBottom: 24}}
        showsVerticalScrollIndicator={false}
      />

      <Dropdown
        visible={activeDropdown === 'sort'}
        options={SORT_OPTIONS}
        selected={sortBy}
        onSelect={opt => {
          setSortBy(opt);
          setActiveDropdown(null);
        }}
        onClose={() => setActiveDropdown(null)}
        anchor={dropdownAnchor}
        colors={colors}
        isDark={isDark}
      />

      {/* Delete Confirmation Modal */}
      <Modal visible={deleteTarget !== null} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setDeleteTarget(null)}>
          <View style={[deleteModalStyles.overlay, {backgroundColor: colors.overlay}]}>
            <TouchableWithoutFeedback>
              <View style={[deleteModalStyles.box, {backgroundColor: colors.surface}]}>
                <View className="mb-4 self-center rounded-full bg-red-50 p-4" style={isDark ? {backgroundColor: '#3B1A1A'} : undefined}>
                  <MaterialDesignIcons name="trash-can-outline" size={28} color="#EF4444" />
                </View>
                <Text className="mb-1 text-center text-lg font-bold" style={{color: colors.text}}>
                  Delete Material?
                </Text>
                <Text className="mb-6 text-center text-sm" style={{color: colors.textMuted}}>
                  This action cannot be undone. The record will be permanently removed.
                </Text>
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    className="flex-1 items-center rounded-2xl py-3.5"
                    style={{borderWidth: 2, borderColor: colors.border}}
                    activeOpacity={0.7}
                    onPress={() => setDeleteTarget(null)}>
                    <Text className="text-sm font-bold" style={{color: colors.textSecondary}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 items-center rounded-2xl bg-red-500 py-3.5"
                    activeOpacity={0.7}
                    style={deleteModalStyles.deleteBtn}
                    onPress={confirmDelete}>
                    <Text className="text-sm font-bold text-white">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const deleteModalStyles = StyleSheet.create({
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

export default Materials;
