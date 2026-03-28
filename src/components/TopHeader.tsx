import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {useAuth} from '../context/AuthContext';
import {useTheme} from '../context/ThemeContext';

type IconName = React.ComponentProps<typeof MaterialDesignIcons>['name'];

/* ───────────────── glass action button ───────────────── */

type ActionBtnProps = {
  icon: IconName;
  onPress?: () => void;
  badge?: boolean;
  iconColor?: string;
  glassBg: string;
};

const ActionBtn = ({icon, onPress, badge, iconColor = '#FFFFFF', glassBg}: ActionBtnProps) => (
  <TouchableOpacity
    style={[s.actionBtn, {backgroundColor: glassBg}]}
    className="h-10 w-10 items-center justify-center rounded-2xl"
    activeOpacity={0.7}
    onPress={onPress}>
    <MaterialDesignIcons name={icon} size={20} color={iconColor} />
    {badge && (
      <View style={s.badge}>
        <View style={s.badgePulse} />
        <View style={s.badgeDot} />
      </View>
    )}
  </TouchableOpacity>
);

/* ───────────────── menu item ───────────────── */

type MenuItemProps = {
  icon: IconName;
  label: string;
  subtitle?: string;
  onPress: () => void;
  color?: string;
  isLast?: boolean;
  isDark: boolean;
  borderColor: string;
};

const MenuItem = ({icon, label, subtitle, onPress, color, isLast, isDark, borderColor}: MenuItemProps) => {
  const isDestructive = color === '#DC2626';
  const textColor = color || (isDark ? '#E2E8F0' : '#1F2937');
  const iconBg = isDestructive
    ? (isDark ? '#451A1A' : '#FEF2F2')
    : (isDark ? '#1E293B' : '#F5F3FF');
  const iconClr = isDestructive ? '#EF4444' : (isDark ? '#A5B4FC' : '#6366F1');

  return (
    <TouchableOpacity
      className="flex-row items-center px-5 py-3.5"
      style={!isLast ? {borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: borderColor} : undefined}
      activeOpacity={0.55}
      onPress={onPress}>
      <View
        className="mr-3.5 h-10 w-10 items-center justify-center rounded-2xl"
        style={{backgroundColor: iconBg}}>
        <MaterialDesignIcons name={icon} size={19} color={iconClr} />
      </View>
      <View className="flex-1">
        <Text className="text-[13.5px] font-bold" style={{color: textColor}}>
          {label}
        </Text>
        {subtitle && (
          <Text
            className="mt-0.5 text-[11px] font-medium"
            style={{color: isDark ? '#64748B' : '#9CA3AF'}}>
            {subtitle}
          </Text>
        )}
      </View>
      <MaterialDesignIcons
        name={isDestructive ? 'arrow-right' : 'chevron-right'}
        size={16}
        color={isDestructive ? '#EF4444' : (isDark ? '#475569' : '#D1D5DB')}
      />
    </TouchableOpacity>
  );
};

/* ───────────────── main header ───────────────── */

const TopHeader = () => {
  const {user, logout} = useAuth();
  const {isDark, colors, toggleTheme} = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  // Spin animation for theme icon
  const spinAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(spinAnim, {
      toValue: isDark ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [isDark, spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const openMenu = () => {
    setMenuVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {toValue: 1, duration: 220, useNativeDriver: true}),
      Animated.spring(scaleAnim, {toValue: 1, friction: 8, tension: 100, useNativeDriver: true}),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {toValue: 0, duration: 160, useNativeDriver: true}),
      Animated.timing(scaleAnim, {toValue: 0.92, duration: 160, useNativeDriver: true}),
    ]).start(() => setMenuVisible(false));
  };

  const handleLogout = () => {
    closeMenu();
    setTimeout(() => logout(), 220);
  };

  const initials = user?.username
    ? user.username.substring(0, 2).toUpperCase()
    : 'U';

  const glassBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.22)';
  const headerBg = isDark ? '#1E1B4B' : '#4F46E5';
  const bannerBg = isDark ? '#312E81' : '#4338CA';

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={headerBg}
        translucent={false}
      />

      {/* Header bar */}
      <View style={[s.header, {backgroundColor: headerBg}]}>
        {/* Decorative accent stripe */}
        <View style={[s.accentStripe, {backgroundColor: isDark ? '#4338CA' : '#818CF8'}]} />

        {/* Left: Logo + Title */}
        <View className="flex-1 flex-row items-center">
          <View style={[s.logoBadge, {backgroundColor: glassBg}]}>
            <MaterialDesignIcons name="package-variant-closed" size={18} color="#FFFFFF" />
          </View>
          <View className="ml-3">
            <Text className="text-[17px] font-extrabold tracking-wide text-white">
              Inventory
            </Text>
            <Text
              className="text-[10.5px] font-semibold"
              style={{color: 'rgba(255,255,255,0.5)'}}>
              Material Tracker
            </Text>
          </View>
        </View>

        {/* Right: Actions */}
        <View className="flex-row items-center gap-2">
          <ActionBtn icon="magnify" glassBg={glassBg} />
          <ActionBtn icon="bell-outline" badge glassBg={glassBg} />

          {/* Theme toggle with spin */}
          <TouchableOpacity
            style={[s.actionBtn, {backgroundColor: glassBg}]}
            className="h-10 w-10 items-center justify-center rounded-2xl"
            activeOpacity={0.7}
            onPress={toggleTheme}>
            <Animated.View style={{transform: [{rotate: spin}]}}>
              <MaterialDesignIcons
                name={isDark ? 'white-balance-sunny' : 'moon-waning-crescent'}
                size={20}
                color={isDark ? '#FCD34D' : '#FFFFFF'}
              />
            </Animated.View>
          </TouchableOpacity>

          {/* Profile avatar with gradient ring */}
          <TouchableOpacity
            style={s.avatarWrap}
            activeOpacity={0.8}
            onPress={openMenu}>
            <View style={s.avatarRing}>
              <View style={s.avatarInner}>
                <Text className="text-[11px] font-extrabold text-white">{initials}</Text>
              </View>
            </View>
            <View style={[s.onlineDot, {borderColor: headerBg}]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ─── Profile dropdown ─── */}
      <Modal visible={menuVisible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={closeMenu}>
          <Animated.View style={[s.overlay, {opacity: fadeAnim}]}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  s.menuCard,
                  {
                    backgroundColor: colors.surface,
                    opacity: fadeAnim,
                    transform: [{scale: scaleAnim}],
                  },
                ]}>

                {/* User banner */}
                <View style={[s.menuBanner, {backgroundColor: bannerBg}]}>
                  <View style={s.menuBannerAvatar}>
                    <Text className="text-base font-extrabold text-white">{initials}</Text>
                  </View>
                  <View className="ml-3.5 flex-1">
                    <Text className="text-[15px] font-extrabold text-white">
                      {user?.username || 'User'}
                    </Text>
                    <Text
                      className="mt-0.5 text-xs font-medium"
                      style={{color: 'rgba(255,255,255,0.55)'}}>
                      {user?.email || 'user@email.com'}
                    </Text>
                  </View>
                  <View style={s.menuBannerBadge}>
                    <Text className="text-[9px] font-extrabold" style={{color: '#4F46E5'}}>
                      PRO
                    </Text>
                  </View>
                </View>

                {/* Menu items */}
                <View className="py-2">
                  <MenuItem
                    icon="account-circle-outline"
                    label="My Profile"
                    subtitle="View and edit your details"
                    onPress={closeMenu}
                    isDark={isDark}
                    borderColor={colors.borderLight}
                  />
                  <MenuItem
                    icon="cog-outline"
                    label="Settings"
                    subtitle="App preferences"
                    onPress={closeMenu}
                    isDark={isDark}
                    borderColor={colors.borderLight}
                  />
                  <MenuItem
                    icon={isDark ? 'white-balance-sunny' : 'moon-waning-crescent'}
                    label={isDark ? 'Light Mode' : 'Dark Mode'}
                    subtitle={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                    onPress={() => {
                      toggleTheme();
                      closeMenu();
                    }}
                    isDark={isDark}
                    borderColor={colors.borderLight}
                  />
                  <MenuItem
                    icon="shield-check-outline"
                    label="Privacy"
                    subtitle="Data and permissions"
                    onPress={closeMenu}
                    isDark={isDark}
                    borderColor={colors.borderLight}
                  />
                </View>

                {/* Logout */}
                <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.borderLight}}>
                  <MenuItem
                    icon="logout"
                    label="Sign Out"
                    onPress={handleLogout}
                    color="#DC2626"
                    isLast
                    isDark={isDark}
                    borderColor={colors.borderLight}
                  />
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

/* ───────────────── styles ───────────────── */

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 14 : 8,
    paddingBottom: 14,
    overflow: 'hidden',
  },
  accentStripe: {
    position: 'absolute',
    top: 0,
    right: -40,
    width: 180,
    height: '100%',
    opacity: 0.25,
    borderBottomLeftRadius: 60,
    transform: [{skewX: '-15deg'}],
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtn: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 10,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgePulse: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(239,68,68,0.3)',
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  avatarWrap: {
    marginLeft: 4,
  },
  avatarRing: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.35)',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
    borderWidth: 2.5,
  },

  // Menu
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  menuCard: {
    position: 'absolute',
    top: 70,
    right: 14,
    width: 280,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 16},
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 16,
    overflow: 'hidden',
  },
  menuBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  menuBannerAvatar: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBannerBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
});

export default TopHeader;
